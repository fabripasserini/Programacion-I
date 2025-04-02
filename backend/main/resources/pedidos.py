from flask_restful import Resource
from flask import request
pedidos={

    1:{'nombre':'pedido uno','direccion':'los peralitos','informacion':'a la pancheria'},
    2:{'nombre':'test','direccion':'los peralitos 1600 cp:5505 casa: 11B','informacion':'casa'},

}

class Pedido(Resource):
    def get(self,id):
        if id in pedidos:
            return pedidos[id],200 #no hace falta especificar el 200
        return {'error':'No existe ese '},404
    def delete(self,id):
        if id in pedidos:
            del pedidos[id]
            return {'mensaje':'pedido eliminado'},204
        return {'error':'No existe ese pedido'},404
    def put(self,id):
        if id in pedidos:
            data=request.get_json()
            pedidos[id].update(data)
            return {'mensaje':'pedido actualizado'},200
        return {'error':'No existe ese pedido'},404
    
class Pedidos(Resource):
    def get(self):
        return pedidos,200
    def post(self):
        data = request.get_json()
        # Aquí creamos un nuevo id automáticamente
        id = max(pedidos.keys()) + 1  # generamos el siguiente id disponible
        pedidos[id] = data
        return {'mensaje': 'pedido creado', 'id': id}, 201