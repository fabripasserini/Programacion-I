from .. import db
#de muchos a muchos no hace falta hacer esto---> intermedias
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_categoria=db.Column(db.Integer,db.ForeignKey('categorias.id'),nullable=False)
    id_usuario=db.Column(db.Integer,db.ForeignKey('usuarios.id'),nullable=False)
    precio= db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Timestamp(50), nullable=False)
    #convertir a json
    def __repr__(self):
        producto_json = {
            'id': self.id,
            'id_categoria': self.id_categoria,
            'id_usuario': self.id_usuario,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'stock': self.stock,
            'created_at': str(self.created_at)
        }
        return producto_json