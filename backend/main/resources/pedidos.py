from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import PedidosModel,ProductosModel,UsuariosModel,PedidoProductoModel
from main.__init__ import db
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required, get_jwt

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
    @jwt_required()
    def put(self,id):
        pedido = db.session.query(PedidosModel).get_or_404(id)
        data = request.get_json()
        claims = get_jwt()
        current_user_id = claims['id']
        current_user_role = claims['rol']

        print(f"Attempting to update pedido {id}")
        print(f"Current User ID: {current_user_id}, Role: {current_user_role}")
        print(f"Pedido User ID: {pedido.id_usuario}, Estado: {pedido.estado}")
        print(f"Request Data: {data}")

        # Admin can update any field
        if current_user_role == 'admin':
            for key, value in data.items():
                setattr(pedido, key, value)
            db.session.add(pedido)
            db.session.commit()
            return 'Pedido actualizado por admin', 200

        # User or employee can cancel the order
        if current_user_role in ['empleado'] or pedido.id_usuario == current_user_id:
            if 'estado' in data and data['estado'] == 'cancelado':
                if pedido.estado == 'proceso':
                    pedido.estado = 'cancelado'
                    db.session.add(pedido)
                    db.session.commit()
                    return {'message': 'El pedido ha sido cancelado.'}, 200
                else:
                    return {'message': f'El pedido no se puede cancelar en su estado actual: {pedido.estado}.'}, 400
            else:
                return {'message': 'No tiene permisos para realizar esta modificación.'}, 403
        
        return {'message': 'No tiene permisos para actualizar este pedido.'}, 403
    #con true No exija el token.

    #Pero si viene, lo use.
class Pedidos(Resource):
    @jwt_required(optional=False)
    def get(self):
        page=1
        per_page=10
        pedidos = db.session.query(PedidosModel).options(joinedload(PedidosModel.usuario))
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
 
        # filtra por pedidos q tengas mayor o igual cantidad
        if request.args.get('productos'):
            pedidos = pedidos.join(PedidoProductoModel, PedidosModel.id==PedidoProductoModel.id_pedidos).group_by(PedidosModel.id).having(func.count(PedidoProductoModel.id_producto) == int(request.args.get('productos')))        
        # funciona -- sirve para filtrar por letras que % contenga %,  comience% o %finalice.  
        if request.args.get('usuario'):
            pedidos = pedidos.join(PedidosModel.usuario).filter(UsuariosModel.nombre.like("%"+ request.args.get('usuario') + "%"))
        if request.args.get('id_usuario'):
            pedidos = pedidos.filter(PedidosModel.id_usuario==request.args.get('id_usuario'))
        # funciona si le pasamos sortby_usuario=algo
        if request.args.get('sortby_usuario'):
            pedidos = pedidos.join(PedidosModel.usuario).order_by(desc(UsuariosModel.nombre))

        # Ordeno los pedidos por precion de forma descendiente - funciona
        if request.args.get('sortby_precio'):
            pedidos=pedidos.order_by(desc(PedidosModel.precio))
        # funciona  
        if request.args.get("sortby_productos"):
                nombre = request.args.get("sortby_productos")

                pedidos = pedidos.join(PedidoProductoModel, PedidosModel.id == PedidoProductoModel.id_pedidos) \
                                .join(ProductosModel, PedidoProductoModel.id_producto == ProductosModel.id) \
                                .filter(ProductosModel.nombre.ilike(f"%{nombre}%")) \
                                .group_by(PedidosModel.id)

        if request.args.get('estado'):
            pedidos=pedidos.filter(PedidosModel.estado==request.args.get('estado'))

        if request.args.get('fecha_inicio') and request.args.get('fecha_final'):
            fecha_inicio = request.args.get('fecha_inicio')
            fecha_final = request.args.get('fecha_final')
            pedidos = pedidos.filter(func.date(PedidosModel.created_at).between(fecha_inicio, fecha_final))
        if request.args.get('fecha'):
            pedidos = pedidos.filter(func.date(PedidosModel.created_at)==request.args.get('fecha'))
        if request.args.get('id'):
            pedidos = pedidos.filter(PedidosModel.id==request.args.get('id'))
        if request.args.get('id_usuario'):
            pedidos = pedidos.filter(PedidosModel.id_usuario==request.args.get('id_usuario'))
        
        if request.args.get('direccion'):
            pedidos = pedidos.filter(PedidosModel.direccion.like("%"+request.args.get('direccion')+"%"))

        pedidos = pedidos.order_by(desc(PedidosModel.created_at))
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=False)

        return {'pedidos': [pedido.to_json_complete() for pedido in pedidos.items],
                  'total': pedidos.total,
                  'pages': pedidos.pages,
                  'page': page
                }
        
        
    @role_required(roles=["admin","user"])
    def post(self):
        claims = get_jwt()
        if not claims['alta']:
            return 'El usuario no está dado de alta', 403
        data = request.get_json()
        productos_data = data.get('productos', [])  # lista de diccionarios

        pedido = PedidosModel.from_json(data)
        db.session.add(pedido)
        db.session.flush()  # asigna ID antes de relacionar productos

        for prod in productos_data:
            producto_id = prod.get('id_producto') or prod.get('id')
            producto = ProductosModel.query.get_or_404(producto_id)
            relacion = PedidoProductoModel(
                pedido=pedido,
                producto=producto,
                cantidad=prod.get('cantidad', 1)
            )
            db.session.add(relacion)

        db.session.commit()
        return pedido.to_json_complete(), 201