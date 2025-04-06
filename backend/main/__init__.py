from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources



def create_app():
    
    app=Flask(__name__)#inicializar flask
    load_dotenv()#cargar variables de entorno
    #inicializar restful
    api=Api(app)
    api.add_resource(resources.ClienteResource,'/cliente/<int:id>')#agregar recurso animal
    api.add_resource(resources.ClientesResource,'/clientes')#agregar recurso animales
    api.add_resource(resources.ProductoResource,'/producto/<int:id>')#agregar recurso animal
    api.add_resource(resources.ProductosResource,'/productos')#agregar recurso animales
    api.add_resource(resources.PedidoResource,'/pedido/<int:id>')#agregar recurso animal
    api.add_resource(resources.PedidosResource,'/pedidos')#agregar recurso animales
    api.add_resource(resources.ValoracionResource, '/valoracion')
    api.add_resource(resources.NotificacionResource, '/notificacion')

    api.init_app(app)#inicializar api
    return app