from main.__init__ import db
from datetime import datetime

#de muchos a muchos no hace falta hacer esto
class Notificaciones(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'),nullable=False)
    informacion = db.Column(db.String(50), nullable=False)
    created_at=db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    usuario=db.relationship('Usuarios',back_populates="notificacion")
    # en las de 1 a n va el relationship en las 2
    #convertir a json
    def __repr__(self):
        return f'<Notificacion {self.id}]>'
    
    
    @staticmethod
    def from_json(notificaciones_json):
        #     foranea=[foranea.to_json() for foranea in self.foraneas]
        # no hace falta porque 1--->N, es unica
        id=notificaciones_json.get('id')
        id_usuario=notificaciones_json.get('id_usuario')
        informacion=notificaciones_json.get('informacion')        
        created_at=notificaciones_json.get('created_at')
        
        return Notificaciones(id=id,id_usuario=id_usuario,informacion=informacion,created_at=created_at)

    def to_json(self):
        #usuario=[usuario.to_json() for usuario in self.usuario] #1 a N o N a N
        notificaciones_json = {
            
            'id': self.id,
            'id_usuario': self.id_usuario,
            'informacion': self.informacion,
            'created_at': str(self.created_at),
           # 'usuario': usuario
            
        }
        return notificaciones_json