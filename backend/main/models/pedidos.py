from main.__init__ import db
from datetime import datetime
from .pedidos_productos import pedidos_productos 
#de muchos a muchos no hace falta hacer esto---> intermedias
class Pedidos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
   # id_categoria=db.Column(db.Integer, nullable=False)
   #id_=db.Column(db.Integer, nullable=False)
    id_usuario=db.Column(db.Integer,db.ForeignKey('usuarios.id'),nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(50), nullable=False)
    precio= db.Column(db.Float, nullable=False)
    created_at=db.Column(db.DateTime,nullable=False,default=datetime.utcnow) 
    productos = db.relationship('Productos', secondary=pedidos_productos, back_populates='pedidos')  # para establecer la relacion
    usuario=db.relationship('Usuarios',back_populates="pedido") # no va el cascade porque es la
    def __repr__(self):
        pedido_json = {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': str(self.created_at)
        }
        return pedido_json
    def to_json(self):
        pedidos_json = {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': str(self.created_at)
        }
        return pedidos_json
    @staticmethod
    def from_json(pedidos_json):
        id=pedidos_json.get('id')
        id_usuario=pedidos_json.get('id_usuario')
        descripcion=pedidos_json.get('descripcion')
        direccion=pedidos_json.get('direccion')
        precio=pedidos_json.get('precio')
        created_at=pedidos_json.get('created_at')
        return Pedidos(id=id,id_usuario=id_usuario,descripcion=descripcion,direccion=direccion,precio=precio,created_at=created_at)
    
    def to_json_complete(self):
        usuario=self.usuario.to_json()
        pedidos_productos=[pedidos_productos for i in pedidos_productos]
        #usuario=[usuario.to_json() for usuario in self.usuario]
        pedido_json = {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'created_at': str(self.created_at),
            'usuario': usuario,
            'pedidos_productos': pedidos_productos
        }
        return pedido_json