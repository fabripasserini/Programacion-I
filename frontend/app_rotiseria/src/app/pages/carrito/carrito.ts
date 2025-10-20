import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { Agregarproducto } from '../../components/agregarproducto/agregarproducto';
import { Carritopedido } from '../../components/carritopedido/carritopedido';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    Footerunico,
    Agregarproducto,
    Carritopedido
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

}
