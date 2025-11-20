import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { Productoresena } from '../../components/productoresena/productoresena';
import { Estrellas } from '../../components/estrellas/estrellas';
import { Comentario } from '../../components/comentario/comentario';
import { Boton } from '../../components/boton/boton';
import { Footerunico } from '../../components/footerunico/footerunico';


@Component({
  selector: 'app-dejarresena',
  imports: [
    CommonModule,
    Back,
    Titulos,
    Footerunico,
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
