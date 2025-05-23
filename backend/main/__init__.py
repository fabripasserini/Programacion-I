from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import os
import main.resources as resources
from flask_migrate import Migrate
# Inicializar SQLAlchemy
db = SQLAlchemy()
migrate=Migrate()
def create_app():
    app = Flask(__name__)
    load_dotenv()

    # Ruta completa a la base de datos
    db_path = os.getenv('PATH_DB')
    db_name = os.getenv('NAME_DB')
    full_path = os.path.join(db_path, db_name)

    # Crear archivo si no existe
    os.makedirs(db_path, exist_ok=True) 

    # Configuración de la base de datos
    if not os.path.exists(os.getenv('PATH_DB')+os.getenv('NAME_DB')):
        os.mknod(os.getenv('PATH_DB')+os.getenv('NAME_DB'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('PATH_DB')+os.getenv('NAME_DB')

    # Inicializar SQLAlchemy con la app
    db.init_app(app)
    migrate.init_app(app, db)
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
    return app
