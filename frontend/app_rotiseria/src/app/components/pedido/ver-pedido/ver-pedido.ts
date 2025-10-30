import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidoService } from '../../../services/pedidos';
import { Pedido } from '../../../interfaces/Pedido'; 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../back/back';
import { Titulos } from '../../titulos/titulos';
import { Estadopedido } from '../../estadopedido/estadopedido';
import { Productoorden } from '../../productoorden/productoorden';
import { Boton } from '../../boton/boton';

@Component({
  selector: 'app-ver-pedido',
  imports: [RouterLink, FormsModule, CommonModule, Back, Titulos, Estadopedido, Productoorden, Boton],
  templateUrl: './ver-pedido.html',
  styleUrl: './ver-pedido.css'
})
export class VerPedido {
  cliente: string = '';
  descripcion: string = ''; 

  arrayPedidos: Pedido[] = []; 
  arrayFiltred: Pedido[] = [];
  constructor(
    private router: Router,
    private pedidosSvc: PedidoService 
  ) {}

  ngOnInit() {
    this.pedidosSvc.getPedidos().subscribe({
      next: (res: any) => {
        console.log("Pedidos: ", res);
        this.arrayPedidos = res.pedidos;
        this.arrayFiltred = [...this.arrayPedidos];
      },
      error: (err) => {
        console.log("Error al traer pedidos: ", err);
      }
    });
  }

  verPedido(pedido: Pedido) {
    this.router.navigateByUrl(`/pedido/${pedido.id}/Detalle`);
  }

  crearPedido() {
    this.router.navigateByUrl(`/pedido/null/Crear`);
  }

  eliminarPedido(pedido: Pedido) {
    this.pedidosSvc.deletePedido(pedido.id).subscribe({
      next: () => {
        alert('Pedido eliminado');
        this.arrayFiltred = this.arrayFiltred.filter(p => p.id !== pedido.id);
      },
      error: (err) => console.error('Error al eliminar pedido:', err)
    });
  }

  buscar() {
    const texto = (this.cliente || '').toLowerCase().trim();
    this.arrayFiltred = this.arrayPedidos.filter(p =>
      (p.usuario?.nombre || '').toLowerCase().includes(texto) ||
      (p.descripcion || '').toLowerCase().includes(texto)
    );
  }
}