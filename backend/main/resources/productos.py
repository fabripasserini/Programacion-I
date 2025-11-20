from flask_restful import Resource
from flask import request
from main.__init__ import db
from main.models import ProductosModel,UsuariosModel,CategoriasModel
from flask import jsonify
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required
from sqlalchemy import func, desc

class Producto(Resource):
    @jwt_required(optional=False)
    def get(self,id):
        producto=db.session.query(ProductosModel).get_or_404(id)
        return producto.to_json_complete()
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
        page=1
        per_page=10
        productos = db.session.query(ProductosModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
 
        # filtra por productos q tengas mayor o igual cantidad
        if request.args.get('productos'):
            productos=productos.filter(ProductosModel.nombre.like("%"+ request.args.get('productos') + "%"))
        
        # funciona -- sirve para filtrar por letras que % contenga %,  comience% o %finalice.  
        if request.args.get('stock'):
            productos = productos.filter(ProductosModel.stock >= int(request.args.get('stock')))
        
        # funciona si le pasamos sortby_usuario=algo
        if request.args.get('categoria_id'):
            productos = productos.filter(ProductosModel.id_categoria == int(request.args.get('categoria_id')))

        # Ordeno los productos por precion de forma descendiente - funciona
        if request.args.get('precio'):
            productos=productos.filter(ProductosModel.precio <= int(request.args.get('precio')))
        # funciona  
        if request.args.get('categoria'):
            productos=productos.join(CategoriasModel, ProductosModel.id_categoria == CategoriasModel.id).filter(CategoriasModel.nombre == request.args.get('categoria')).order_by(CategoriasModel.nombre.desc())
        if request.args.get('nombre'):
            productos=productos.filter(ProductosModel.nombre.like("%"+ request.args.get('nombre') + "%"))

        
    
        productos = productos.paginate(page=page, per_page=per_page, error_out=False)

        return {'productos': [pedido.to_json() for pedido in productos],
                  'total': productos.total,
                  'pages': productos.pages,
                  'page': page
                }
    
    @role_required(roles=["admin"])
    def post(self):
        producto=ProductosModel.from_json(request.get_json())
        try:
            db.session.add(producto)
            db.session.commit()
        except:
            return 'Producto creado', 201
        return producto.to_json(), 201