from .. import db
#de muchos a muchos no hace falta hacer esto
class Categoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
   
    #convertir a json
    def __repr__(self):
        categoria_json = {
            'id': self.id,
            'nombre': self.nombre
        }
        return categoria_json