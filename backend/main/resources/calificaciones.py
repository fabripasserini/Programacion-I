from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import CalificacionesModel
from main.__init__ import db


class Calificacion(Resource):
    def get(self,id):
        calificacion=db.session.query(CalificacionesModel).get_or_404(id)
        return calificacion.to_json_complete() 
    
class Calificaciones(Resource):
    def get(self):
        calificaciones= db.session.query(CalificacionesModel).all()
        return [calificacion.to_json() for calificacion in calificaciones],200
    def post(self):
        data_usuario = CalificacionesModel.from_json(request.get_json())
        db.session.add(data_usuario)
        db.session.commit()
        return 'Calificacion creada', 201