from main.__init__ import db
from datetime import datetime


class Pedidos(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relaciones
    usuario = db.relationship('Usuarios', back_populates='pedido', lazy=True)
    pedidos_productos = db.relationship(
        "PedidoProducto",
        back_populates="pedido",
        cascade="all, delete-orphan",
        lazy=True
    )

    # Representación en consola
    def __repr__(self):
        return f'<Pedido {self.id}: {self.descripcion}>'

    # ======== SERIALIZADORES ========

    def to_json(self):
        """Versión simplificada del pedido."""
        return {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': self.created_at.isoformat(),
            'id_usuario': self.id_usuario
        }

    def to_json_complete(self):
        """Versión extendida, con productos asociados."""
        return {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': self.created_at.isoformat(),
            'id_usuario': self.id_usuario,
            'productos': [
                {
                    'id': pp.producto.id,
                    'nombre': pp.producto.nombre,
                    'cantidad': pp.cantidad
                }
                for pp in self.pedidos_productos
            ]
        }

    # ======== DESERIALIZADOR ========

    @staticmethod
    def from_json(pedidos_json):
        """Convierte un diccionario JSON en un objeto Pedido."""
        return Pedidos(
            id_usuario=pedidos_json.get('id_usuario'),
            descripcion=pedidos_json.get('descripcion'),
            direccion=pedidos_json.get('direccion'),
            precio=pedidos_json.get('precio'),
            created_at=pedidos_json.get('created_at', datetime.utcnow())
        )
