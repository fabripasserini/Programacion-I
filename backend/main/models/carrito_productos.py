from main.__init__ import db

class CarritoProducto(db.Model):
    __tablename__ = 'carrito_productos'
    id = db.Column(db.Integer, primary_key=True)
    id_carrito = db.Column(db.Integer, db.ForeignKey('carritos.id'), nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False, default=1)

    # Relaciones
    carrito = db.relationship('Carritos', back_populates='carrito_productos')
    producto = db.relationship('Productos', back_populates='carrito_productos')

    def __repr__(self):
        return f'<CarritoProducto {self.id}: Carrito {self.id_carrito}, Producto {self.id_producto}, Cantidad {self.cantidad}>'

    def to_json(self):
        return {
            'id_producto': self.id_producto,
            'cantidad': self.cantidad,
        }
    def carrito_id(self):
        return self.id_carrito