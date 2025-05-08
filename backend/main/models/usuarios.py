from main.__init__ import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
class Usuarios(db.Model):
    __tablename__= 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False, server_default = "usuarios")
    dni=db.Column(db.String(50),nullable=False)
    created_at=db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    calificacion=db.relationship('Calificaciones',back_populates="usuario",cascade="all, delete-orphan")
    pedido=db.relationship('Pedidos',back_populates="usuario",cascade="all, delete-orphan")
    notificacion=db.relationship('Notificaciones',
                                 # [+]no va el uselist=False porque no es 1 a 1[+]
                                 back_populates="usuario",
                                 cascade="all, delete-orphan",) #[+] tampoco va el single_parent=True porque no es 1 a 1 ( van de la mano las 2),Por defecto es False
    #convertir a json
   
    @property
    def plain_password(self):
        raise AttributeError('Plain password is not accessible')

    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)

    def validate_pass(self,password):
        return check_password_hash(self.password,password)

    def __repr__(self):
        return f'<Usuario {self.id}]>'
        
    def to_json(self):
        usuarios_json = {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'password': self.password,
            'rol': self.rol,
            'dni': self.dni,
            'created_at': str(self.created_at)
            
              
        }
        return usuarios_json
    @property
    def plain_password(self):
        raise AttributeError('Plain password is not accessible')
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)
    def validate_pass(self,password):
        return check_password_hash(self.password,password)
    @staticmethod
    def from_json(usuarios_json):
        id=usuarios_json.get('id')
        nombre=usuarios_json.get('nombre')
        apellido=usuarios_json.get('apellido')
        email=usuarios_json.get('email')
        password=usuarios_json.get('password')
        rol=usuarios_json.get('rol','usuarios')
        dni=usuarios_json.get('dni')
        password=usuarios_json.get('password')
        created_at=usuarios_json.get('created_at')
        return Usuarios(id=id,nombre=nombre,apellido=apellido,email=email,password=password,rol=rol,dni=dni,plain_password=password,created_at=created_at)
    
    def to_json_complete(self):
        notificacion=[notificacion.to_json() for notificacion in self.notificacion]
        usuarios_json = {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'password': self.password,
            'rol': self.rol,
            'dni': self.dni,
            'notificacion': notificacion
            
            
        }
        return usuarios_json
    