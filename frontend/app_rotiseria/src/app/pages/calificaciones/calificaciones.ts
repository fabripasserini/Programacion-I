import { Component } from '@angular/core';
import { Calificaciones as CalificacionesComponent } from '../../components/calificaciones/calificaciones';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
@Component({
  selector: 'app-calificaciones-page',
  imports: [CalificacionesComponent,Back,Footerunico],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.css'
})
export class Calificaciones {

}
