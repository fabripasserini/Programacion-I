import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente'; 
import { CategoriasProductos } from '../../components/categorias-productos/categorias-productos';
import { Categorias } from '../../components/categorias/categorias';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    CategoriasProductos,
    FooterCliente,
    Categorias
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}


