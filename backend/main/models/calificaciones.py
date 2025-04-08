from .. import db
#de muchos a muchos no hace falta hacer esto
class Clasificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    id_usuario = db.Column(db.Integer,db.ForeignKey('usuarios.id'), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    estrellas = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Timestamp(50), nullable=False)


    
    #convertir a json
    def __repr__(self):
        usuario_json = {
            'id': self.id,
            'id_producto': self.id_producto,
            'id_usuario': self.id_usuario,
            'descripcion': self.descripcion,
            'estrellas': self.estrellas,
            'created_at': self.created_at
        }
        return usuario_json