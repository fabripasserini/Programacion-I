import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Estadopedido } from '../../components/estadopedido/estadopedido';
import { Productoorden } from '../../components/productoorden/productoorden';

@Component({
  selector: 'app-pedidoscancelados',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    Estadopedido,
    Productoorden
  ],
  templateUrl: './pedidoscancelados.html',
  styleUrl: './pedidoscancelados.css'
})
export class Pedidoscancelados {

}
