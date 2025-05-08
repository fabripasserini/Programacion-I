from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import NotificacionesModel
from main.__init__ import db
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt

class Notificacion(Resource):
    @role_required(roles=["admin","usuarios"])
    def get(self,id):
        notificacion=db.session.query(NotificacionesModel).get_or_404(id)
        return notificacion.to_json()
    
class Notificaciones(Resource):
    @role_required(roles=["admin"])
    def get(self):
        notificaciones = db.session.query(NotificacionesModel).all()
        return [notificacion.to_json() for notificacion in notificaciones], 200
    @role_required(roles=["admin"])
    def post(self):
        data_usuario = NotificacionesModel.from_json(request.get_json())
        db.session.add(data_usuario)
        db.session.commit()
        return data_usuario.to_json(), 201
    