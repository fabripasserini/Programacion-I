import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
import { VerPedido } from '../../components/pedido/ver-pedido/ver-pedido';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [
    CommonModule,
    Back,
    Footerunico,
    VerPedido
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {
  userId!: string;
  tipo_op!: string;
  usuario: any = {};
  fondo = '';
  constructor(
    private route:ActivatedRoute,
  ){}
 
}