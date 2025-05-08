from flask_restful import Resource
from flask import request
from main.__init__ import db               #POR ALGO ESTO NO ANDA[++++++++++++++]
from main.models import ProductosModel
from flask import jsonify
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required
class Producto(Resource):
    @jwt_required(optional=False)
    def get(self,id):
        producto=db.session.query(ProductosModel).get_or_404(id)
        return producto.to_json_complete() #no hace falta especificar el 200
    @role_required(roles=["admin"])
    def delete(self,id):
        producto=db.session.query(ProductosModel).get_or_404(id)
        db.session.delete(producto)
        db.session.commit()
        return 'Producto eliminado',200
    
    @role_required(roles=["admin"])
    def put(self,id):
        producto=db.session.query(ProductosModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(producto,key,value) # ver que hace esto
        db.session.add(producto)
        db.session.commit()
        return 'Producto actualizado',200 
    
class Productos(Resource):
    @jwt_required(optional=False)
    def get(self):
        productos=db.session.query(ProductosModel).all()
        return [producto.to_json() for producto in productos],200
    
    @role_required(roles=["admin"])
    def post(self):
        producto=ProductosModel.from_json(request.get_json())
        try:
            db.session.add(producto)
            db.session.commit()
        except:
            return 'Producto creado', 201
        return producto.to_json(), 201