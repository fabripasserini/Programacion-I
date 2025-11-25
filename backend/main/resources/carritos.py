from flask_restful import Resource
from flask import request
from main.__init__ import db
from main.models import CarritosModel, CarritoProductoModel, ProductosModel, UsuariosModel
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required

class CarritoResource(Resource):
    @jwt_required()
    def get(self,id):
        carrito = db.session.query(CarritosModel).filter_by(id_usuario=id).first()
        if not carrito:
            return {'message': 'Carrito no encontrado para el usuario actual'}, 404
        return carrito.to_json(), 200

    @jwt_required()
    def post(self,id):
        data = request.get_json()
        product_id = data.get('id_producto')
        cantidad = data.get('cantidad', 1)

        if not product_id:
            return {'message': 'id_producto es requerido'}, 400

        producto = db.session.query(ProductosModel).get(product_id)
        carrito = db.session.query(CarritosModel).filter_by(id_usuario=id).first()

        if not carrito:
            carrito = CarritosModel(id_usuario=id)
            db.session.add(carrito)
            db.session.flush() # Para obtener el ID del carrito antes de añadir productos

        carrito_producto = db.session.query(CarritoProductoModel).filter_by(
            id_carrito=carrito.id,
            id_producto=product_id
        ).first()

        if carrito_producto:
            carrito_producto.cantidad += cantidad
        else:
            carrito_producto = CarritoProductoModel(
                id_carrito=carrito.id,
                id_producto=product_id,
                cantidad=cantidad
            )
            db.session.add(carrito_producto)
        
        producto.stock -= cantidad # Restar del stock
        db.session.add(producto)
        db.session.commit()
        return carrito.to_json(), 200

    @jwt_required()
    def put(self,id):
        data = request.get_json()
        product_id = data.get('id_producto')
        new_cantidad = data.get('cantidad')

        if not product_id or new_cantidad is None:
            return {'message': 'id_producto y cantidad son requeridos'}, 400
        
        if new_cantidad <= 0:
            return {'message': 'La cantidad debe ser mayor que cero'}, 400

        carrito = db.session.query(CarritosModel).filter_by(id=id).first()
        if not carrito:
            return {'message': 'Carrito no encontrado para el usuario actual'}, 404

        carrito_producto = db.session.query(CarritoProductoModel).filter_by(
            id_carrito=carrito.id,
            id_producto=product_id
        ).first()

        if not carrito_producto:
            return {'message': 'Producto no encontrado en el carrito'}, 404
        
        producto = db.session.query(ProductosModel).get(product_id)
        if not producto:
            return {'message': 'Producto no encontrado'}, 404

        # Calcular la diferencia de stock necesaria
        stock_change = new_cantidad - carrito_producto.cantidad
        if producto.stock < stock_change:
            return {'message': f'No hay suficiente stock para el producto {producto.nombre}. Stock disponible: {producto.stock}'}, 400

        producto.stock -= stock_change # Ajustar el stock
        carrito_producto.cantidad = new_cantidad
        
        db.session.add(producto)
        db.session.add(carrito_producto)
        db.session.commit()
        return carrito.to_json(), 200

    @jwt_required()
    def delete(self, id):
        # Si envían JSON, eliminar un solo producto
        if request.is_json:
            data = request.get_json()
            product_id = data.get('id_producto')

            if not product_id:
                return {'message': 'id_producto es requerido'}, 400

            # El 'id' de la URL es el 'id_carrito'
            id_carrito = id

            carrito_producto = db.session.query(CarritoProductoModel).filter_by(
                id_carrito=id_carrito,
                id_producto=product_id
            ).first()

            if not carrito_producto:
                return {'message': 'Producto no encontrado en el carrito'}, 404
            
            # Devolver stock
            producto = db.session.query(ProductosModel).get(product_id)
            if producto:
                producto.stock += carrito_producto.cantidad
                db.session.add(producto)

            db.session.delete(carrito_producto)
            db.session.commit()

            return {'message': 'Producto eliminado del carrito'}, 200


        # Si NO viene JSON → VACÍAR CARRITO ENTERO
        carrito = db.session.query(CarritosModel).filter_by(id=id).first()
        
        if not carrito:
            return {'message': 'Carrito no encontrado'}, 404

        productos = db.session.query(CarritoProductoModel).filter_by(id_carrito=carrito.id).all()

        for cp in productos:
            producto = db.session.query(ProductosModel).get(cp.id_producto)
            if producto:
                producto.stock += cp.cantidad
                db.session.add(producto)
            db.session.delete(cp)

        db.session.commit()
        return {'message': 'Carrito vaciado'}, 200


class CarritosListResource(Resource):
    @role_required(roles=["admin"])
    def get(self):
        carritos = db.session.query(CarritosModel).all()
        return [carrito.to_json() for carrito in carritos], 200
