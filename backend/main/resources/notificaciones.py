from flask_restful import Resource
from flask import request

notificaciones = {
    1:{'destinatario':'juan','mensaje':'hola'},
    2:{'destinatario':'admin','mensaje':'hola2'}

}

class Notificacion(Resource):
    def get(self):
        return notificaciones,200
    
    def post(self):
        data = request.get_json()
        id = max(notificaciones) + 1
        notificaciones[id] = data
        return "Notificacion creada", 201
    