from flask_restful import Resource
from flask import request
from main.__init__ import db               #POR ALGO ESTO NO ANDA[++++++++++++++]
from main.models import UsuariosModel
from main.models import NotificacionesModel
from flask import jsonify
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required

class Usuario(Resource):
    @jwt_required(optional=False)
    def get(self,id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        current_identity = get_jwt_identity()
        if current_identity == usuario.id:
            return usuario.to_json_complete() # solo cuando le pasemos el id va a mostar la notificacion
        else:
            return usuario.to_json() # solo cuando le pasemos el id va a mostar la notificacion


    @role_required(roles=["admin"])
    def delete(self,id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        rol=get_jwt().get('rol')
        if rol=='usuario' and usuario.id != get_jwt_identity():
            return "No tienes permisos para ultilizar este recurso",403
        db.session.delete(usuario)
        db.session.commit()
        return 'Usuario eliminado',200 # [+]el codigo 204 no emite una respuesta en flask[+]


    @jwt_required(optional=False)
    def put(self,id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:#
            setattr(usuario,key,value) 
        db.session.add(usuario)
        db.session.commit()
        return 'Usuario actualizado',200



class Usuarios(Resource):
    @role_required(roles=["admin","empleado"])
    def get(self):
        page=1
        per_page=20
        usuarios = db.session.query(UsuariosModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        
        # funciona -- sirve para filtrar tengas mayor o igual cantidad
        if request.args.get('notificaciones'):
            usuarios = usuarios.outerjoin(UsuariosModel.notificacion).group_by(UsuariosModel.id).having(func.count(NotificacionesModel.id) >= int(request.args.get('notificaciones')))
        
        # funciona ordena de forma descendiente x id
        if request.args.get('sortby_usuario_id'):
            usuarios = usuarios.order_by(desc(UsuariosModel.id))

        # ordena los usuarios desde un id x hasta otro y
        if request.args.get('set_range'):
            range_values = request.args.get('set_range').split(',')
            if len(range_values) == 2:  # Asegurarse de que haya dos valores
                param_1 = int(range_values[0])
                param_2 = int(range_values[1])
                usuarios = usuarios.filter(UsuariosModel.id.between(param_1, param_2))

        # funciona ordena de forma descendiente x nombre
        if request.args.get('sortby_usuario_name'):
            usuarios = usuarios.order_by(desc(UsuariosModel.nombre))
        if request.args.get('usuario'):
            usuarios = usuarios.filter(UsuariosModel.nombre.like("%"+ request.args.get('usuario') + "%"))
        if request.args.get('email'):
            usuarios = usuarios.filter(UsuariosModel.email.like("%"+ request.args.get('email') + "%"))
        # Ordeno los usuarios por rol de forma descendiente - funciona
        if request.args.get('is_admin'):
            usuarios = usuarios.filter(UsuariosModel.rol == 'admin')
        if request.args.get('dni'):
            usuarios=usuarios.filter(UsuariosModel.dni==request.args.get('dni'))
        if request.args.get('id'):
            usuarios=usuarios.filter(UsuariosModel.id==request.args.get('id'))
        ##email y nombre
        #Obtener valor paginado
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=False)

        return {'usuarios': [usuario.to_json() for usuario in usuarios.items],
                  'total': usuarios.total,
                  'pages': usuarios.pages,
                  'page': page
                }
        
    @role_required(roles=["admin","empleado"])
    def post(self):
        data_usuario = UsuariosModel.from_json(request.get_json())
        db.session.add(data_usuario)
        db.session.commit()

        usuarios_id=request.get_json().get('campo')
        usuario=UsuariosModel.from_json(request.get_json())
        if usuarios_id:
            campo=Usuarios

        return 'Usario creado', 201
