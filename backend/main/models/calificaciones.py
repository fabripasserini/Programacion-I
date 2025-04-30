from main.__init__ import db
from datetime import datetime

#de muchos a muchos no hace falta hacer esto
class Calificaciones(db.Model):
    __tablename__= 'calificaciones'
    id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    id_usuario = db.Column(db.Integer,db.ForeignKey('usuarios.id'), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    estrellas = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.utcnow)
    producto=db.relationship('Productos',back_populates="calificacion")
    usuario=db.relationship('Usuarios',back_populates="calificacion")

    
    #convertir a json
    def __repr__(self):
        calificacion_json = {
            'id': self.id,
            'id_producto': self.id_producto,
            'id_usuario': self.id_usuario,
            'descripcion': self.descripcion,
            'estrellas': self.estrellas,
            'created_at': self.created_at
        }
        return calificacion_json
    def to_json(self):
        calificacion_json = {
            'id': self.id,
            'id_producto': self.id_producto,
            'id_usuario': self.id_usuario,
            'descripcion': self.descripcion,
            'estrellas': self.estrellas,
            'created_at': str(self.created_at)
        }
        return calificacion_json
    @staticmethod
    def from_json(calificacion_json):
        id=calificacion_json.get('id')
        id_producto=calificacion_json.get('id_producto')
        id_usuario=calificacion_json.get('id_usuario')
        descripcion=calificacion_json.get('descripcion')        
        estrellas=calificacion_json.get('estrellas')
        created_at=calificacion_json.get('created_at')
        return Calificaciones(id=id,id_producto=id_producto,id_usuario=id_usuario,descripcion=descripcion,estrellas=estrellas,created_at=created_at)
    def to_json_complete(self):
        producto=self.producto.to_json()
        usuario=self.usuario.to_json()
        calificacion_json = {
            'id': self.id,
            'id_producto': self.id_producto,
            'id_usuario': self.id_usuario,
            'descripcion': self.descripcion,
            'estrellas': self.estrellas,
            'created_at': str(self.created_at),
            'producto': producto,
            'usuario': usuario
        }
        return calificacion_json