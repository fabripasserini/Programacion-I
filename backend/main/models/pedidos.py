from .. import db
#de muchos a muchos no hace falta hacer esto---> intermedias
class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
   # id_categoria=db.Column(db.Integer, nullable=False)
   #id_=db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(50), nullable=False)
    precio= db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Timestamp(50), nullable=False)
    #convertir a json
    def __repr__(self):
        pedido_json = {
            'id': self.id,
            'descripcion': self.descripcion,
            'direccion': self.direccion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at)
        }
        return pedido_json