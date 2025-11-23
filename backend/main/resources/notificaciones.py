from flask_restful import Resource
from flask import request
from flask import jsonify
from main.models import NotificacionesModel
from main.__init__ import db
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from sqlalchemy import func, desc
from main.models import UsuariosModel

class Notificacion(Resource):
    @role_required(roles=["admin","user"])
    def get(self,id):
        notificacion=db.session.query(NotificacionesModel).get_or_404(id)
        return notificacion.to_json()
    def delete(self,id):
        notificacion=db.session.query(NotificacionesModel).get_or_404(id)
        db.session.delete(notificacion)
        db.session.commit()
        return 'Notificacion eliminada',200 # [+]el codigo 204 no emite una respuesta en flask[+]
class Notificaciones(Resource):
    @role_required(roles=["admin","user"])
    def get(self):
        query = db.session.query(NotificacionesModel)

        # Filtrar por email / usuario si querés
        email = request.args.get("email")
        if email:
            query = query.join(NotificacionesModel.usuario).filter(UsuariosModel.email == email)

        # ORDENAMIENTO
        sort = request.args.get("sort", "desc")

        if sort == "asc":
            query = query.order_by(NotificacionesModel.created_at.asc())
        else:
            query = query.order_by(NotificacionesModel.created_at.desc())
         
        if request.args.get('id_usuario'):
            query = query.filter(NotificacionesModel.id_usuario == int(request.args.get('id_usuario')))
        return [n.to_json() for n in query], 200
    @role_required(roles=["admin"])
    def post(self):
        data = request.get_json()

        usuarios = data.get("usuarios")
        mensaje = data.get("informacion")

        if not mensaje:
            return {"error": "El mensaje es obligatorio"}, 400

        # CASO 3 — Enviar a TODOS los usuarios
        if usuarios == "todos":
            ids = [u.id for u in UsuariosModel.query.all()]

        # CASO 1 y 2 — lista de usuarios
        elif isinstance(usuarios, list):
            ids = usuarios

        else:
            return {"error": "Formato inválido para 'usuarios'"}, 400

        # Inserción de notificaciones
        creadas = []
        for uid in ids:
            notif = NotificacionesModel(
                id_usuario=uid,
                informacion=mensaje
            )
            db.session.add(notif)
            creadas.append(notif)

        db.session.commit()

        return {
            "mensaje": "Notificaciones enviadas correctamente",
            "cantidad": len(creadas),
            "usuarios": ids
        }, 201
    
    