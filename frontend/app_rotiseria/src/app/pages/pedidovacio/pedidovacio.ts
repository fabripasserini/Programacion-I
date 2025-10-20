import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { Estadopedido } from '../../components/estadopedido/estadopedido';
import { Footerunico } from '../../components/footerunico/footerunico';
import { Sinordenes } from '../../components/sinordenes/sinordenes';

@Component({
  selector: 'app-pedidovacio',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    Footerunico,
    Estadopedido,
    Sinordenes
  ],
  templateUrl: './pedidovacio.html',
  styleUrl: './pedidovacio.css'
})
export class Pedidovacio {

}
