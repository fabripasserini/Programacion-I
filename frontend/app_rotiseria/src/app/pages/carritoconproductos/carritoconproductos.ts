import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Carritopedido } from '../../components/carritopedido/carritopedido';
import { Back } from '../../components/back/back';
import { Productocarrito } from '../../components/productocarrito/productocarrito';
import { Textoespaciado } from '../../components/textoespaciado/textoespaciado';
import { Boton } from '../../components/boton/boton';
@Component({
  selector: 'app-carritoconproductos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterCliente,
    Carritopedido,
    Back,
    Productocarrito,
    Textoespaciado,
    Boton
  ],
  templateUrl: './carritoconproductos.html',
  styleUrl: './carritoconproductos.css'
})
export class Carritoconproductos {

}
