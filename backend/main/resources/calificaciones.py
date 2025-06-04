from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import CalificacionesModel
from main.models import ProductosModel
from main.models import UsuariosModel
from main.__init__ import db
from sqlalchemy import func, desc
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required

class Calificacion(Resource):
    @jwt_required(optional=True)
    def get(self,id):
        calificacion=db.session.query(CalificacionesModel).get_or_404(id)
        return calificacion.to_json_complete() 
    
class Calificaciones(Resource):
    @jwt_required(optional=True)
    def get(self):
        page=1
        per_page=10
        calificaciones = db.session.query(CalificacionesModel)
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        if request.args.get('estrellas'):
            calificaciones = db.session.query(CalificacionesModel).filter(CalificacionesModel.estrellas >= int(request.args.get('calificaciones')))

        if request.args.get('usuario'):
            calificaciones = calificaciones.join(CalificacionesModel.usuario).filter(UsuariosModel.nombre.like("%"+ request.args.get('usuario') + "%"))
        

        
        if request.args.get('sortby_estrellas'):
            calificaciones=calificaciones.order_by(desc(CalificacionesModel.estrellas))
        # funciona  
        if request.args.get('sortby_productos'):
            calificaciones = calificaciones.join(CalificacionesModel.producto).filter(ProductosModel.id== request.args.get('sortby_productos'))
        
        calificaciones = calificaciones.paginate(page=page, per_page=per_page, error_out=False)
        
        return {'calificaciones  ': [calificacion.to_json() for calificacion in calificaciones],
                  'total': calificaciones.total,
                  'pages': calificaciones.pages,
                  'page': page
                }
    
    @role_required(roles=["admin","usuarios"])
    def post(self):
        data_usuario = CalificacionesModel.from_json(request.get_json())
        db.session.add(data_usuario)
        db.session.commit()
        return 'Calificacion creada', 201