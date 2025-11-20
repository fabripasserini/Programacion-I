from main.__init__ import db
from datetime import datetime


class Pedidos(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(50), nullable=False)
    total = db.Column(db.Float, nullable=True)
    estado = db.Column(db.String(50), nullable=False)
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
    @property
    def precio_total(self):
        """Calcula el precio total del pedido sumando productos * cantidad."""
        return sum(
            pp.producto.precio * pp.cantidad
            for pp in self.pedidos_productos
        )

    def to_json(self):
        """Versión simplificada del pedido."""
        return {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'total': self.precio_total,
            'estado': self.estado,
            'created_at': self.created_at.isoformat(),
            'id_usuario': self.id_usuario
        }

    def to_json_complete(self):
        """Versión extendida, con productos asociados."""
        usuario_json = self.usuario.to_json() if self.usuario else None
        return {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'total': self.precio_total,
            'created_at': self.created_at.isoformat(),
            'estado': self.estado,
            'id_usuario': self.id_usuario,
            'usuario': usuario_json,
            'productos': [
                {
                    'id_producto': pp.producto.id,
                    'nombre': pp.producto.nombre,
                    'cantidad': pp.cantidad,
                    'precio': pp.producto.precio,
                    'total_producto': pp.producto.precio * pp.cantidad
                }
                for pp in self.pedidos_productos
            ]
        }

    # ======== DESERIALIZADOR ========

    @staticmethod
    def from_json(pedidos_json):
        return Pedidos(
            id_usuario=pedidos_json.get('id_usuario'),
            descripcion=pedidos_json.get('descripcion'),
            direccion=pedidos_json.get('direccion'),
            estado="proceso",              # 🔥 default
            total=0                          # 🔥 se recalcula luego
        )

