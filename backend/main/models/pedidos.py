from main.__init__ import db
from datetime import datetime
# #de muchos a muchos no hace falta hacer esto---> intermedias
pedidos_productos = db.Table(
    "pedidos_productos",
    db.Column("id_pedidos", db.Integer, db.ForeignKey("pedidos.id"), primary_key=True),
    db.Column("id_producto", db.Integer, db.ForeignKey("productos.id"), primary_key=True)
 )

class Pedidos(db.Model):
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    usuario = db.relationship('Usuarios', back_populates='pedido')
    productos = db.relationship('Productos', secondary=pedidos_productos, backref=db.backref('pedidos', lazy='dynamic'))

    def __repr__(self):
        return f'<Pedido {self.id}: {self.descripcion}>'

    def to_json(self):
        return {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': str(self.created_at)
        }

    def to_json_complete(self):
        return {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': str(self.created_at),
            'usuario': self.usuario.to_json(),
            'productos':[producto.to_json() for producto in self.productos]
            #'productos': [producto.to_json() for producto in self.productos]
        }

    @staticmethod
    def from_json(pedidos_json):
        id = pedidos_json.get('id')
        id_usuario = pedidos_json.get('id_usuario')
        descripcion = pedidos_json.get('descripcion')
        direccion = pedidos_json.get('direccion')
        precio = pedidos_json.get('precio')
        created_at = pedidos_json.get('created_at', datetime.utcnow())
        return Pedidos(
            id=id,
            id_usuario=id_usuario,
            descripcion=descripcion,
            direccion=direccion,
            precio=precio,
            created_at=created_at
        )
