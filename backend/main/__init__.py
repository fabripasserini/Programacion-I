from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import os
import main.resources as resources
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
db = SQLAlchemy()
jwt = JWTManager()
#Importar Flask mail
from flask_mail import Mail
mailsender = Mail()

def create_app():
    app = Flask(__name__)
    # Inicializar SQLAlchemy fuera de la función create_app
   
    migrate = Migrate()
    
    load_dotenv()
    CORS(app)
    # Ruta completa a la base de datos
    db_path = os.getenv('PATH_DB')
    db_name = os.getenv('NAME_DB')
    full_path = os.path.join(db_path, db_name)
    
    # Crear archivo si no existe
    os.makedirs(db_path, exist_ok=True)

    # Configuración de la base de datos
    if not os.path.exists(os.getenv('PATH_DB')+os.getenv('NAME_DB')):
        os.mknod(os.getenv('PATH_DB')+os.getenv('NAME_DB'))
    
    # Configuraciones de la app
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('PATH_DB')+os.getenv('NAME_DB')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))

    # Inicializar extensiones
    db.init_app(app)  # Inicializar SQLAlchemy con la app
    migrate.init_app(app, db)  # Inicializar Migrate
    jwt.init_app(app)  # Inicializar JWT

    # Inicializar API
    api = Api(app)
    api.add_resource(resources.UsuarioResource, '/usuario/<int:id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.ProductoResource, '/producto/<int:id>')
    api.add_resource(resources.ProductosResource, '/productos')
    api.add_resource(resources.PedidoResource, '/pedido/<int:id>')
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.CalificacionResource, '/calificacion/<int:id>')
    api.add_resource(resources.CalificacionesResource, '/calificaciones')
    api.add_resource(resources.NotificacionResource, '/notificacion/<int:id>')
    api.add_resource(resources.NotificacionesResource, '/notificaciones')
    api.add_resource(resources.CategoriaResource, '/categoria/<int:id>')
    api.add_resource(resources.CategoriasResource, '/categorias')
    api.add_resource(resources.CarritoResource, '/carrito/<int:id>')
    api.add_resource(resources.CarritosListResource, '/carritos/all')

    # Registrar Blueprint de autenticación
    from main.auth import routes
    app.register_blueprint(routes.auth)

    #Configuración de mail
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')
    #Inicializar en app
    mailsender.init_app(app)

    return app