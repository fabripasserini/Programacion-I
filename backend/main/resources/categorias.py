from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import CategoriasModel
from main.__init__ import db
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required

class Categoria(Resource):
    @jwt_required(optional=True)
    def get(self,id):
        categoria=db.session.query(CategoriasModel).get_or_404(id)
        return categoria.to_json()
    @role_required(roles=["admin"])
    def delete(self,id):
        categoria=db.session.query(CategoriasModel).get_or_404(id)
        db.session.delete(categoria)
        db.session.commit()
        return 'Categoria eliminada',200
    @role_required(roles=["admin"])
    def put(self,id):
        categoria=db.session.query(CategoriasModel).get_or_404(id)
        data=request.get_json().items()
        for key,value in data:
            setattr(categoria,key,value) 
        db.session.add(categoria)
        db.session.commit()
        return 'Categoria actualizada',200
class Categorias(Resource):
    def get(self):

        categorias=db.session.query(CategoriasModel).all()
        return [categoria.to_json() for categoria in categorias],200 
    @role_required(roles=["admin"])
    def post(self):
        data_categoria=CategoriasModel.from_json(request.get_json())
        db.session.add(data_categoria)
        db.session.commit()
        return 'Categoria creada', 200