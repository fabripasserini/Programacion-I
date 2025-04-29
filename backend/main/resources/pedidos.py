from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import PedidosModel,ProductosModel
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
        page=1
        per_page=40
        pedidos_query = db.session.query(PedidosModel)

        # Pagina la consulta
        pedidos_paginated = pedidos_query.paginate(page=page, per_page=per_page, error_out=False)

        # Devuelve los resultados paginados
        return [pedido.to_json_complete() for pedido in pedidos_paginated.items], 200
    def post(self):
        productos_ids = request.get_json().get('productos')
        pedido=PedidosModel.from_json(request.get_json())  # Extraer los IDs de los productos
        if productos_ids:
            productos=ProductosModel.query.filter(ProductosModel.id.in_(productos_ids)).all()
            pedido.productos.extend(productos)
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json_complete(), 201