import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Puntajecomida } from '../../components/puntajecomida/puntajecomida';

@Component({
  selector: 'app-favoritos',
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    Puntajecomida
  ],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {

}
