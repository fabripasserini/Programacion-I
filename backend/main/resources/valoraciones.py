from flask_restful import Resource
from flask import request

valoraciones = {

    1:{'producto':'juan','valoracion':'hola'},
    2:{'producto':'admin','valoracion':'hola2'}
}

class Valoraciones(Resource):
    def post(self):
        data = request.get_json()
        id = max(valoraciones) + 1
        valoraciones[id] = data
        return "Valoracion creada", 201

    def get(self):
        return valoraciones
class Valoracion(Resource):
    def get(self,id):
        if id in valoraciones:
            return valoraciones[id],200 #no hace falta especificar el 200
        return {'error':'No existe esta valoracion '},404
    