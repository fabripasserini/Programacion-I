import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productoorden } from '../productoorden/productoorden';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule, Productoorden],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css'
})
export class ListaPedidos {
  @Input() pedidos: any[] = [];
  @Input() estado: 'proceso' | 'completado' | 'cancelado' = 'proceso';

  trackById(item: any) {
    return item.id;
  }
}
