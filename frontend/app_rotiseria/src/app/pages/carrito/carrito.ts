import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Agregarproducto } from '../../components/agregarproducto/agregarproducto';
import { Carritopedido } from '../../components/carritopedido/carritopedido';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    Agregarproducto,
    Carritopedido
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

}
