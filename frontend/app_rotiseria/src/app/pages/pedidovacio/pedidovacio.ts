import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Estadopedido } from '../../components/estadopedido/estadopedido';
import { Sinordenes } from '../../components/sinordenes/sinordenes';

@Component({
  selector: 'app-pedidovacio',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    Estadopedido,
    Sinordenes
  ],
  templateUrl: './pedidovacio.html',
  styleUrl: './pedidovacio.css'
})
export class Pedidovacio {

}
