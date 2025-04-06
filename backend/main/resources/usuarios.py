from flask_restful import Resource
from flask import request
usuarios={

    1:{'nombre':'juan','apellido':'perez'},
    2:{'nombre':'admin','apellido':'test'}
}

class Usuario(Resource):
    def get(self,id):
        if id in usuarios:
            return usuarios[id],200 #no hace falta especificar el 200
        return {'error':'No existe ese '},404
    def delete(self,id):
        if id in usuarios:
            del usuarios[id]
            return {'mensaje':'usuario eliminado'},204
        return {'error':'No existe ese usuario'},404
    def put(self,id):
        if id in usuarios:
            data=request.get_json()
            usuarios[id].update(data)
            return {'mensaje':'usuario actualizado'},200
        return {'error':'No existe ese usuario'},404
    
class Usuarios(Resource):
    def get(self):
        return usuarios,200
    def post(self):
        data = request.get_json()
        # Aquí creamos un nuevo id automáticamente
        id = max(usuarios.keys()) + 1  # generamos el siguiente id disponible
        usuarios[id] = data
        return {'mensaje': 'usuario creado', 'id': id}, 201