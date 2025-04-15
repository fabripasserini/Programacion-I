from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import PedidosModel
from main.__init__ import db
class Pedido(Resource):
    def get(self,id):
        pedido=db.session.query(PedidosModel).get_or_404(id)
        return pedido.to_json_complete()
    def delete(self,id):
        pedido=db.session.query(PedidosModel).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return 'Pedido eliminado',200
    def put(self,id):
        pedido=db.session.query(PedidosModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(pedido,key,value) # ver que hace esto
        db.session.add(pedido)
        db.session.commit()
        return 'Pedido actualizado',200
    
        #pedido = db.session.query(Pedido.model).get_or_404(id)
        # data = request.get_json().items()
        # for key, value in data
        #   setattr(pedido, key, value)
        # db.session.add(pedido)
        # de.session.commit()
        # return animal.to_json(), 201
    
class Pedidos(Resource):
    def get(self):
        pedidos=db.session.query(PedidosModel).all()
        return [pedido.to_json_complete() for pedido in pedidos],200
    def post(self):
        data_pedido=PedidosModel.from_json(request.get_json())
        db.session.add(data_pedido)
        db.session.commit()
        return 'Pedido creado', 201
    


# el fileter sirve para ver si existe el id, despues sino sdevuelve todo (historias clinicas get)