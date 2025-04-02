from flask_restful import Resource
from flask import request
productos={

    1:{'nombre':'asado','informacion':'carne asada'},
    2:{'nombre':'fideos','informacion':'con crema'}
}

class Producto(Resource):
    def get(self,id):
        if id in productos:
            return productos[id],200 #no hace falta especificar el 200
        return {'error':'No existe ese '},404
    def delete(self,id):
        if id in productos:
            del productos[id]
            return {'mensaje':'producto eliminado'},204
        return {'error':'No existe ese producto'},404
    def put(self,id):
        if id in productos:
            data=request.get_json()
            productos[id].update(data)
            return {'mensaje':'producto actualizado'},200
        return {'error':'No existe ese producto'},404
    
class Productos(Resource):
    def get(self):
        return productos,200
    def post(self):
        data = request.get_json()
        # Aquí creamos un nuevo id automáticamente
        id = max(productos.keys()) + 1  # generamos el siguiente id disponible
        productos[id] = data
        return {'mensaje': 'producto creado', 'id': id}, 201