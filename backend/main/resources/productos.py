from flask_restful import Resource
from flask import request
from main.__init__ import db
from main.models import ProductosModel,UsuariosModel,CategoriasModel, CalificacionesModel
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
    
from sqlalchemy import func, desc
from sqlalchemy.orm import aliased

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
    def get(self):
        page=1
        per_page=10

        CalificacionAlias = aliased(CalificacionesModel)

        subquery = db.session.query(
            CalificacionAlias.id_producto,
            func.avg(CalificacionAlias.estrellas).label('average_rating')
        ).group_by(CalificacionAlias.id_producto).subquery()

        productos_query = db.session.query(
            ProductosModel,
            func.coalesce(subquery.c.average_rating, 0).label('average_rating')
        ).outerjoin(subquery, ProductosModel.id == subquery.c.id_producto)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
 
        # filtra por productos q tengas mayor o igual cantidad
        if request.args.get('productos'):
            productos_query=productos_query.filter(ProductosModel.nombre.like("%"+ request.args.get('productos') + "%"))
        
        # funciona -- sirve para filtrar por letras que % contenga %,  comience% o %finalice.  
        if request.args.get('stock'):
            productos_query = productos_query.filter(ProductosModel.stock >= int(request.args.get('stock')))
        


        # Ordeno los productos por precion de forma descendiente - funciona
        if request.args.get('precio'):
            productos_query=productos_query.filter(ProductosModel.precio <= int(request.args.get('precio')))
        # funciona  
        if request.args.get('categoria'):
            productos_query = productos_query.filter(ProductosModel.id_categoria == int(request.args.get('categoria')))
        if request.args.get('nombre'):
            productos_query=productos_query.filter(ProductosModel.nombre.like("%"+ request.args.get('nombre') + "%"))

        if request.args.get('sortby_calificaciones'):
            productos_query = productos_query.order_by(desc(func.coalesce(subquery.c.average_rating, 0)))
        
    
        productos_pagination = productos_query.paginate(page=page, per_page=per_page, error_out=False)

        return {'productos': [
            producto.to_json(average_rating)
            for producto, average_rating in productos_pagination.items
        ],
                  'total': productos_pagination.total,
                  'pages': productos_pagination.pages,
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