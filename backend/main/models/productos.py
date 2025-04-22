from main.__init__ import db
from datetime import datetime
from .pedidos_productos_intermedia import PedidosProductos
#de muchos a muchos no hace falta hacer esto---> intermedias


class Productos(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    categoria = db.relationship('Categorias', back_populates='producto')
    intermedia_productos = db.relationship('Pedidos', secondary='pedidos_productos', back_populates='intermedia_pedidos')  # Relación muchos-a-muchos # Relación muchos a muchos
    calificacion = db.relationship('Calificaciones', back_populates="producto", cascade="all, delete-orphan")  # Relación uno-a-muchos
    id_categoria=db.Column(db.Integer,db.ForeignKey('categorias.id'),nullable=False)

    # Métodos de serialización (to_json, from_json, etc.)
   # categoria=db.relationship('Categorias',back_populates="producto") #no va el cascade porque es la
    #!!!calificacion=db.relationship('Calificaciones',back_populates="producto",cascade="all, delete-orphan")
    #las intermedias no van como clases
    #convertir a json
    def __repr__(self):
        productos_json = {
            'id': self.id,
            'id_categoria': self.id_categoria,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at)
        }
        return productos_json
    def to_json(self):
        productos_json = {
            'id': self.id,
            'id_categoria': self.id_categoria,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at)
        }
        return productos_json
    @staticmethod
    def from_json(productos_json):
        id=productos_json.get('id')
    
        id_categoria=productos_json.get('id_categoria')
        nombre=productos_json.get('nombre')
        descripcion=productos_json.get('descripcion')
        precio=productos_json.get('precio')
        stock=productos_json.get('stock')
        created_at=productos_json.get('created_at')        
        return Productos(id=id,nombre=nombre,id_categoria=id_categoria,descripcion=descripcion,precio=precio,stock=stock,created_at=created_at)
    
    def to_json_complete(self):
        #categoria=[categoria.to_json() for categoria in self.categoria]
        categoria=self.categoria.to_json()
        #calificacion=[calificacion.to_json() for calificacion in self.calificacion]
        producto_json = {
            'id': self.id,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at),
            'categoria': categoria
            #'calificacion': calificacion
        }
        return producto_json
