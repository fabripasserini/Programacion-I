import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
import { Notificaciones as NotificacionesComponent } from '../../components/notificaciones/notificaciones';
@Component({
  selector: 'app-notificaciones-page',
  imports: [Footerunico,Back,NotificacionesComponent],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones {

}
