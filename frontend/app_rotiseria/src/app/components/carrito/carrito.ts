// carrito.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetUserInfo } from '../../services/getuserinfo';
import { Carritos as CarritosService } from '../../services/carritos';
import { Boton } from '../boton/boton';
import { Productos as ProductosService } from '../../services/productos';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, Boton, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  
  private carritosService = inject(CarritosService);
  private userInfo = inject(GetUserInfo);
  private productosService = inject(ProductosService);

  productos: any[] = [];
  subtotal: number = 0;
  total: number = 0;

  userId: number | null = null;
  idCarrito: number | null = null;

  ngOnInit() {
    this.userId = this.userInfo.getId();
    if (this.userId) {
      this.loadCarrito();
    }
  }
  
  loadCarrito() {
    if (!this.userId) return;

    this.carritosService.getCarrito(this.userId).subscribe({
      next: (res: any) => {
        console.log('Carrito recibido:', res);
        this.idCarrito = res.id_carrito;
        const productosCarrito = res.productos || [];
        this.productos = [];

        productosCarrito.forEach((item: any) => {
          const id_producto = item.id_producto;

          this.productosService.getProducto(id_producto).subscribe({
            next: (prod: any) => {
              this.productos.push({
                ...prod,
                cantidad: item.cantidad
              });
              this.calcularTotal();
            },
            error: err => console.error("Error cargando producto", err)
          });
        });
      },
      error: err => console.error("Error al obtener carrito:", err)
    });
  }

  calcularTotal() {
    this.subtotal = this.productos.reduce(
      (acc, producto) => acc + (producto.precio * producto.cantidad), 
      0
    );
    this.total = this.subtotal;
  }

  deleteProducto(id_producto: number) {
    if (!this.idCarrito) {
      console.error("No hay idCarrito disponible");
      return;
    }
    this.carritosService.deleteProducto(this.idCarrito, id_producto).subscribe({
      next: () => {
        this.productos = this.productos.filter(producto => producto.id_producto !== id_producto);
        this.calcularTotal();
      },
      error: (err) => console.error('Error al eliminar producto:', err)
    });
  }

  vaciarCarrito() {
    if (!this.idCarrito) {
      console.error("No hay idCarrito disponible");
      return;
    }
    this.carritosService.limpiarCarrito(this.idCarrito).subscribe({
      next: () => {
        this.productos = [];
        this.calcularTotal();
      },
      error: (err) => console.error('Error al vaciar carrito:', err)
    });
  }

  updateCantidad(producto: any) {
    if (!this.idCarrito) {
      console.error("No hay idCarrito disponible");
      return;
    }

    // Validar mínimo 1
    if (producto.cantidad < 1) {
      producto.cantidad = 1;
    }

    // Validar máximo (stock)
    if (producto.cantidad > producto.stock) {
      producto.cantidad = producto.stock;
    }

    const body = {
      id_producto: producto.id_producto,
      cantidad: producto.cantidad
    };

    console.log('Enviando:', body);

    this.carritosService.updateProducto(this.idCarrito, body).subscribe({
      next: () => {
        this.calcularTotal();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  getRol() {
    return this.userInfo.getRol();
  }
}