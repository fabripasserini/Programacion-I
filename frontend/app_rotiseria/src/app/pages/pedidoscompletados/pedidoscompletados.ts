import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Estadopedido } from '../../components/estadopedido/estadopedido';
import { Productoorden } from '../../components/productoorden/productoorden';
import { Boton } from '../../components/boton/boton';

@Component({
  selector: 'app-pedidoscompletados',
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    Estadopedido,
    Productoorden,
    Boton
  ],
  templateUrl: './pedidoscompletados.html',
  styleUrl: './pedidoscompletados.css'
})
export class Pedidoscompletados {

}
