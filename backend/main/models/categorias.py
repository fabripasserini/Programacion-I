from main.__init__ import db

#de muchos a muchos no hace falta hacer esto
class Categorias(db.Model):
    __tablename__= 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    producto=db.relationship('Productos',back_populates="categoria")
    # el uselist=False solo va cuando es de 1 a 1
    #convertir a json
    def __repr__(self):
        categorias_json = {
            'id': self.id,
            'nombre': self.nombre
        }
        return categorias_json
    
    @staticmethod
    def from_json(categorias_json):
        id=categorias_json.get('id')
        nombre=categorias_json.get('nombre')        
        return Categorias(id=id,nombre=nombre)
    


    def to_json(self):
        categorias_json = {
            'id': self.id,
            'nombre': self.nombre
        }
        return categorias_json
    #no hace falta el json complete porque no estamos devolviendo nungun dato extra