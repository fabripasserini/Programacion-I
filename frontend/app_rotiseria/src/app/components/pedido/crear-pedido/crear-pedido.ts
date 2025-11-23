import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResumenProductos } from '../../resumen-productos/resumen-productos';
import { GetUserInfo } from '../../../services/getuserinfo';
import { Carritos as CarritosService } from '../../../services/carritos';
import { Pedidos as PedidosService } from '../../../services/pedidos';
import { Productos as ProductosService } from '../../../services/productos';
import { Notificaciones as NotificacionesService } from '../../../services/notificaciones';
import { PedidoCreate } from '../../../interfaces/PedidoCreate';
import { Titulos } from '../../titulos/titulos';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [CommonModule, ResumenProductos,Titulos,ReactiveFormsModule],
  templateUrl: './crear-pedido.html',
  styleUrl: './crear-pedido.css'
})
export class CrearPedido implements OnInit {
  
  private carritosService = inject(CarritosService);
  private pedidosService = inject(PedidosService);
  private productosService = inject(ProductosService);
  private userInfo = inject(GetUserInfo);
  private notificacionesService = inject(NotificacionesService);
  private router = inject(Router);
  formPedido: FormGroup = new FormGroup({
    direccion: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });
  productos: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  idCarrito: number | null = null;

  // Agregá estos para la descripción y dirección
  descripcion: string = "";
  direccion: string = "";

  ngOnInit() {
    
    this.cargarCarrito();
  }

  cargarCarrito() {
    const userId = this.userInfo.getId();
    if (!userId) return;

    this.carritosService.getCarrito(userId).subscribe({
      next: (res: any) => {
        this.idCarrito = res.id_carrito;
        const productosCarrito = res.productos || [];
        this.productos = [];

        productosCarrito.forEach((item: any) => {
          this.productosService.getProducto(item.id_producto).subscribe({
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
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    this.total = this.subtotal;
  }

  confirmarPedido() {
    const userId = this.userInfo.getId();

    if (!userId || !this.idCarrito || this.productos.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    // 🔥 Crear objeto pedido válido
    const pedido: PedidoCreate = {
      id_usuario: userId,
      descripcion: this.formPedido.value.descripcion,
      direccion: this.formPedido.value.direccion,
      productos: this.productos.map(p => ({
        id_producto: p.id_producto,
        cantidad: p.cantidad
      }))
    };

    this.pedidosService.createPedido(pedido).subscribe({
      next: (res) => {
        console.log('Pedido creado:', res);
        alert('¡Pedido confirmado con éxito!');
        
        this.carritosService.limpiarCarrito(this.idCarrito!).subscribe();
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        console.error('Error al crear pedido:', err);
        alert('Hubo un error al procesar tu pedido');
      }
    });
  }

  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
