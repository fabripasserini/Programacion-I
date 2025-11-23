import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
import { Carrito } from '../../components/carrito/carrito';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Footerunico,
    Carrito
    
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoPage {

}
