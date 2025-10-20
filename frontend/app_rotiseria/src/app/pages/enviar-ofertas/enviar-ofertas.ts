import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-enviar-ofertas',
  imports: [Footerunico,Back],
  templateUrl: './enviar-ofertas.html',
  styleUrl: './enviar-ofertas.css'
})
export class EnviarOfertas {

}
