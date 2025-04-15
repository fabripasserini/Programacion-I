from main.__init__ import db

# # Tabla intermedia para la relación muchos a muchos
# class Productos_pedidos(db.Model):
#     producto_id=db.Column('producto_id', db.Integer, db.ForeignKey('productos.id'), primary_key=True),
#     pedido_id=db.Column('pedido_id', db.Integer, db.ForeignKey('pedidos.id'), primary_key=True),
#     cantidad=db.Column('cantidad', db.Integer, nullable=False),  # Cantidad de productos en el pedido
#     precio=db.Column('precio', db.Float, nullable=False)  # Precio de cada producto en el pedido

#     def to_json(self):
#         productos_pedidos_json = {
#             'producto_id': self.producto_id,
#             'pedido_id': self.pedido_id,
#             'cantidad': self.cantidad,
#             'precio': self.precio
#         }
#         return productos_pedidos_json


pedidos_productos = db.Table('pedidos_productos',
    db.Column('pedido_id', db.Integer, db.ForeignKey('pedidos.id'), primary_key=True),
    db.Column('producto_id', db.Integer, db.ForeignKey('productos.id'), primary_key=True),
    db.Column('cantidad', db.Integer, nullable=False),  # Cantidad de productos en el pedido
    db.Column('precio', db.Float, nullable=False)  # Precio de cada producto en el pedido
)