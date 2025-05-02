from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import PedidosModel,ProductosModel,UsuariosModel
from main.__init__ import db
from sqlalchemy import func, desc

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
    
class Pedidos(Resource):
    def get(self):
        page=1
        per_page=2
        pedidos = db.session.query(PedidosModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
 
        # filtra por pedidos q tengas mayor o igual cantidad
        if request.args.get('productos'):
            pedidos=pedidos.outerjoin(PedidosModel.productos).group_by(PedidosModel.id).having(func.count(ProductosModel.id) >= int(request.args.get('productos')))
        
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
            pedidos=pedidos.outerjoin(PedidosModel.productos).group_by(PedidosModel.id).order_by(func.count(ProductosModel.id).desc())
        

        
    
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=False)

        return {'pedidos': [pedido.to_json() for pedido in pedidos],
                  'total': pedidos.total,
                  'pages': pedidos.pages,
                  'page': page
                }
        
        
       
    def post(self):
        productos_ids = request.get_json().get('productos')
        pedido=PedidosModel.from_json(request.get_json())  # Extraer los IDs de los productos
        if productos_ids:
            productos=ProductosModel.query.filter(ProductosModel.id.in_(productos_ids)).all()
            pedido.productos.extend(productos)
        db.session.add(pedido)
        db.session.commit()
        return pedido.to_json_complete(), 201