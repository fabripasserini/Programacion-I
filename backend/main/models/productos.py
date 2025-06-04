from main.__init__ import db
from datetime import datetime

class Productos(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    pedidos_productos = db.relationship("PedidoProducto", back_populates="producto")

    categoria = db.relationship('Categorias', back_populates='producto')
    calificacion = db.relationship('Calificaciones', back_populates="producto", cascade="all, delete-orphan")
    

    def __repr__(self):
        return f'<Producto {self.id}: {self.nombre}>'

    def to_json(self):
        return {
            'id': self.id,
            'id_categoria': self.id_categoria,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at)
        }

    def to_json_complete(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at),
            'categoria': self.categoria.to_json() if self.categoria else None
          #  'pedidos': [pedido.to_json() for pedido in self.pedidos]
        }

    @staticmethod
    def from_json(productos_json):
        id = productos_json.get('id')
        id_categoria = productos_json.get('id_categoria')
        nombre = productos_json.get('nombre')
        descripcion = productos_json.get('descripcion')
        precio = productos_json.get('precio')
        stock = productos_json.get('stock')
        created_at = productos_json.get('created_at', datetime.utcnow())

        return Productos(
            id=id,
            id_categoria=id_categoria,
            nombre=nombre,
            descripcion=descripcion,
            precio=precio,
            stock=stock,
            created_at=created_at
        )
