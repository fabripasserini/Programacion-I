import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Back } from '../../components/back/back';
import { CommonModule } from '@angular/common';
import { CrearPedido } from '../../components/pedido/crear-pedido/crear-pedido';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [Back, CommonModule,CrearPedido],
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css']
})
export class Pedido implements OnInit {
  pedidoId!: string;
  tipo_op!: string;
  fondo = '';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pedidoId = this.route.snapshot.paramMap.get('id') || '';
  }
}
