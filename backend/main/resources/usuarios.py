from flask_restful import Resource
from flask import request
from main.__init__ import db               #POR ALGO ESTO NO ANDA[++++++++++++++]
from main.models import UsuariosModel
from flask import jsonify

class Usuario(Resource):
    def get(self,id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        return usuario.to_json_complete() # solo cuando le pasemos el id va a mostar la notificacion
      
    def delete(self,id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return 'Usuario eliminado',200 # [+]el codigo 204 no emite una respuesta en flask[+]

    def put(self,id):
        usuario=db.session.query(UsuariosModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:#
            setattr(usuario,key,value) 
        db.session.add(usuario)
        db.session.commit()
        return 'Usuario actualizado',200
class Usuarios(Resource):
    def get(self):
        usuarios= db.session.query(UsuariosModel).all()
        return [usuario.to_json() for usuario in usuarios],200 
        #return jsonify([usuario.to_json() for usuario in usuarios]),200 #no hace falta porque flasK-RESTFUL lo convierte solo
    def post(self):
        data_usuario = UsuariosModel.from_json(request.get_json())
        db.session.add(data_usuario)
        db.session.commit()

        usuarios_id=request.get_json().get('campo')
        usuario=UsuariosModel.from_json(request.get_json())
        if usuarios_id:
            campo=Usuarios

        return 'Usario creado', 201
