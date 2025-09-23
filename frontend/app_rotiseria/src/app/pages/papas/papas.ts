import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-papas',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    ProductCard 
  ],
  templateUrl: './papas.html',
  styleUrl: './papas.css'
})
export class Papas {

}

