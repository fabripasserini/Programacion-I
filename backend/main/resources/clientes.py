from flask_restful import Resource
from flask import request
clientes={

    1:{'nombre':'juan','apellido':'perez'},
    2:{'nombre':'admin','apellido':'test'}
}

class Cliente(Resource):
    def get(self,id):
        if id in clientes:
            return clientes[id],200 #no hace falta especificar el 200
        return {'error':'No existe ese '},404
    def delete(self,id):
        if id in clientes:
            del clientes[id]
            return {'mensaje':'cliente eliminado'},204
        return {'error':'No existe ese cliente'},404
    def put(self,id):
        if id in clientes:
            data=request.get_json()
            clientes[id].update(data)
            return {'mensaje':'cliente actualizado'},200
        return {'error':'No existe ese cliente'},404
    
class Clientes(Resource):
    def get(self):
        return clientes,200
    def post(self):
        data = request.get_json()
        # Aquí creamos un nuevo id automáticamente
        id = max(clientes.keys()) + 1  # generamos el siguiente id disponible
        clientes[id] = data
        return {'mensaje': 'cliente creado', 'id': id}, 201