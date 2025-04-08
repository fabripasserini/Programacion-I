from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import os
import main.resources as resources

# Inicializar SQLAlchemy
db = SQLAlchemy()

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
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{full_path}"

    # Inicializar SQLAlchemy con la app
    db.init_app(app)

    # Inicializar API
    api = Api(app)
    api.add_resource(resources.UsuarioResource, '/usuario/<int:id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.ProductoResource, '/producto/<int:id>')
    api.add_resource(resources.ProductosResource, '/productos')
    api.add_resource(resources.PedidoResource, '/pedido/<int:id>')
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.ValoracionResource, '/valoracion/<int:id>')
    api.add_resource(resources.ValoracionesResource, '/valoraciones')
    api.add_resource(resources.NotificacionResource, '/notificacion')

    return app
