import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedidos as PedidosService } from '../../services/pedidos';
import { GetUserInfo } from '../../services/getuserinfo';
import { Router } from '@angular/router';
import { Notificaciones as NotificacionesService } from '../../services/notificaciones';
@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css'
})
export class ListaPedidos {
  @Input() pedidos: any[] = [];
  @Input() estado: 'proceso' | 'completado' | 'cancelado' = 'proceso';
  @Input() titulo!: string;
  @Input() precio!: string;
  @Input() cantidad!: number;
  @Input() imagenSrc!: string;
  @Input() imagenAlt!: string;
  modo: string= 'ver';
  private pedidosService = inject(PedidosService);
  constructor(private userInfo: GetUserInfo,
    private router: Router,
    private notificacionesService: NotificacionesService
  ) {}

  trackById(item: any) { 
    return item.id;
  }

  cancelarPedido(id: number) {
    this.pedidosService.cancelarPedido(id).subscribe({
      next: () => {
        alert('Pedido cancelado exitosamente');
        this.pedidos = this.pedidos.filter(p => p.id !== id);
      },
      error: (err) => {
        console.error('Error al cancelar el pedido', err);
      }
    });
  }
  completarPedido(id: number) {
    const pedido = this.pedidos.find(p => p.id === id);
    if (!pedido) return;

    this.pedidosService.updatePedido({ id: id, estado: 'completado' }).subscribe({
      next: () => {
        alert('Pedido completado exitosamente');
        this.pedidos = this.pedidos.filter(p => p.id !== id);
        this.notificacionesService.createNotificacion({
          usuarios: [pedido.id_usuario],
          informacion: 'Pedido completado'
        }).subscribe({
          next: () => console.log('Notificación enviada'),
          error: (err) => console.error('Error al enviar notificación', err)
        });
      },
      error: (err) => {
        console.error('Error al completar el pedido', err);
      }
    });
  }

  getRol() {
    return this.userInfo.getRol();
  }
//   comentarProducto(id: number) {
// }
  dejarComentario(productoId: number) {
  this.router.navigate(['/calificaciones'], {
    queryParams: { 
      id_producto: productoId,
      modo: 'crear' // 👈 Este parámetro indica solo crear reseña
    }
  });
}

}
