import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { Puntajecomida } from '../../components/puntajecomida/puntajecomida';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-favoritos',
  imports: [
    CommonModule,
    Back,
    Titulos,
    Footerunico,
    Puntajecomida
  ],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {

}
