import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Bienvenido } from '../../components/bienvenido/bienvenido';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente'; 
import { CategoriasProductos } from '../../components/categorias-productos/categorias-productos';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Bienvenido,
    CategoriasProductos,
    FooterCliente
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
