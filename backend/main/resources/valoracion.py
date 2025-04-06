from flask_restful import Resource
from flask import request

valoraciones = {}

class Valoracion(Resource):
    def post(self):
        data = request.get_json()
        id = max(valoraciones) + 1
        valoraciones[id] = data
        return "Valoracion creada", 201

    def get(self):
        return valoraciones
    