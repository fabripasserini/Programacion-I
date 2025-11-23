from main.__init__ import db

class PedidoProducto(db.Model):
    __tablename__ = 'pedidos_productos'
    id_pedidos = db.Column(db.Integer, db.ForeignKey('pedidos.id'), primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), primary_key=True)
    cantidad = db.Column(db.Integer, nullable=False,default=1)

    pedido = db.relationship("Pedidos", back_populates="pedidos_productos")
    producto = db.relationship("Productos", back_populates="pedidos_productos")
