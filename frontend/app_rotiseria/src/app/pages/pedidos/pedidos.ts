import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { Estadopedido } from '../../components/estadopedido/estadopedido';
import { Boton } from '../../components/boton/boton';
import { Footerunico } from '../../components/footerunico/footerunico';
import { VerPedido } from '../../components/pedido/ver-pedido/ver-pedido';
import { ActivatedRoute } from '@angular/router';
import { GetUserInfo } from '../../services/getuserinfo';

@Component({
  selector: 'app-pedidos',
  imports: [
    CommonModule,
    Back,
    Titulos,
    Footerunico,
    Estadopedido,
    Boton,
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