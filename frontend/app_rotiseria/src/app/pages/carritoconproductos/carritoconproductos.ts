import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Carritopedido } from '../../components/carritopedido/carritopedido';
import { Back } from '../../components/back/back';
import { Productocarrito } from '../../components/productocarrito/productocarrito';
import { Textoespaciado } from '../../components/textoespaciado/textoespaciado';
import { Boton } from '../../components/boton/boton';
import { Footerunico } from '../../components/footerunico/footerunico';
@Component({
  selector: 'app-carritoconproductos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Footerunico,
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
