from main.__init__ import db

class PedidosProductos(db.Model):
    __tablename__= 'pedidos_productos'
    producto_id=db.Column('producto_id', db.Integer, db.ForeignKey('productos.id'), primary_key=True)
    pedido_id=db.Column('pedido_id', db.Integer, db.ForeignKey('pedidos.id'), primary_key=True)
    cantidad=db.Column('cantidad', db.Integer, nullable=False)
    precio=db.Column('precio', db.Float, nullable=False)

    def to_json(self):
        productos_pedidos_json = {
            'producto_id': self.producto_id,
            'pedido_id': self.pedido_id,
            'cantidad': self.cantidad,
            'precio': self.precio
        }
        return productos_pedidos_json
#???