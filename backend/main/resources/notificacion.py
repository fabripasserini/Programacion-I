from flask_restful import Resource
from flask import request

notificaciones = {}

class Notificacion(Resource):
    def post(self):
        data = request.get_json()
        id = max(notificaciones) + 1
        notificaciones[id] = data
        return "Notificacion creada", 201
    
