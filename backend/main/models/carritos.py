from main.__init__ import db
from datetime import datetime

class Carritos(db.Model):
    __tablename__ = 'carritos'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relaciones
    usuario = db.relationship('Usuarios', back_populates='carrito', uselist=False)
    carrito_productos = db.relationship('CarritoProducto', back_populates='carrito', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Carrito {self.id}>'

    def to_json(self):
        return {
            'id_carrito': self.id,
            
            'id_usuario': self.id_usuario,
            'created_at': self.created_at.isoformat(),
            'productos': [item.to_json() for item in self.carrito_productos]
        }
