from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import NotificacionesModel
from main.__init__ import db

class Notificacion(Resource):
    def get(self,id):
        notificacion=db.session.query(NotificacionesModel).get_or_404(id)
        return notificacion.to_json()
    
class Notificaciones(Resource):
    def get(self):
        notificaciones = db.session.query(NotificacionesModel).all()
        return [notificacion.to_json() for notificacion in notificaciones], 200
    def post(self):
        data_usuario = NotificacionesModel.from_json(request.get_json())
        db.session.add(data_usuario)
        db.session.commit()
        return data_usuario.to_json(), 201
    
    ##to_json seu sa solo para representar los datos