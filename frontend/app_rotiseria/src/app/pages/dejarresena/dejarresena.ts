import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';
import { Productoresena } from '../../components/productoresena/productoresena';
import { Estrellas } from '../../components/estrellas/estrellas';
import { Comentario } from '../../components/comentario/comentario';
import { Boton } from '../../components/boton/boton';


@Component({
  selector: 'app-dejarresena',
  imports: [
    CommonModule,
    Back,
    Titulos,
    FooterCliente,
    Productoresena,
    Estrellas,
    Comentario,
    Boton

  ],
  templateUrl: './dejarresena.html',
  styleUrl: './dejarresena.css'
})
export class Dejarresena {

}
