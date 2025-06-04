from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import PedidosModel,ProductosModel,UsuariosModel,PedidoProductoModel
from main.__init__ import db
from sqlalchemy import func, desc
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required

class Pedido(Resource):
    @jwt_required(optional=False)
    def get(self,id):
        pedido=db.session.query(PedidosModel).get_or_404(id)
        return pedido.to_json_complete()
    @role_required(roles=["admin"])
    def delete(self,id):
        pedido=db.session.query(PedidosModel).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return 'Pedido eliminado',200
    @role_required(roles=["admin"])
    def put(self,id):
        pedido=db.session.query(PedidosModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(pedido,key,value) # ver que hace esto
        db.session.add(pedido)
        db.session.commit()
        return 'Pedido actualizado',200
    #con true No exija el token.

    #Pero si viene, lo use.
class Pedidos(Resource):
    @jwt_required(optional=False)
    def get(self):
        page=1
        per_page=10
        pedidos = db.session.query(PedidosModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
 
        # filtra por pedidos q tengas mayor o igual cantidad
        if request.args.get('productos'):
            pedidos = pedidos.join(PedidoProductoModel, PedidosModel.id==PedidoProductoModel.id_pedidos).group_by(PedidosModel.id).having(func.count(PedidoProductoModel.id_producto) >= int(request.args.get('productos')))        
        # funciona -- sirve para filtrar por letras que % contenga %,  comience% o %finalice.  
        if request.args.get('usuario'):
            pedidos = pedidos.join(PedidosModel.usuario).filter(UsuariosModel.nombre.like("%"+ request.args.get('usuario') + "%"))
        
        # funciona si le pasamos sortby_usuario=algo
        if request.args.get('sortby_usuario'):
            pedidos = pedidos.join(PedidosModel.usuario).order_by(desc(UsuariosModel.nombre))

        # Ordeno los pedidos por precion de forma descendiente - funciona
        if request.args.get('sortby_precio'):
            pedidos=pedidos.order_by(desc(PedidosModel.precio))
        # funciona  
        if request.args.get('sortby_productos'):
            pedidos=pedidos.outerjoin(PedidoProductoModel.producto).group_by(PedidosModel.id).order_by(func.count(ProductosModel.id).desc())
        

        
    
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=False)

        return {'pedidos': [pedido.to_json() for pedido in pedidos],
                  'total': pedidos.total,
                  'pages': pedidos.pages,
                  'page': page
                }
        
        
    @role_required(roles=["admin","usuarios"])
    def post(self):
        data = request.get_json()
        productos_data = data.get('productos', [])  # lista de diccionarios

        pedido = PedidosModel.from_json(data)
        db.session.add(pedido)
        db.session.flush()  # asigna ID antes de relacionar productos

        for prod in productos_data:
            producto = ProductosModel.query.get_or_404(prod['id'])
            relacion = PedidoProductoModel(
                pedido=pedido,
                producto=producto,
                cantidad=prod.get('cantidad', 1)
            )
            db.session.add(relacion)

        db.session.commit()
        return pedido.to_json_complete(), 201
