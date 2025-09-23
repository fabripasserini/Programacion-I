import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-enviar-ofertas',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './enviar-ofertas.html',
  styleUrl: './enviar-ofertas.css'
})
export class EnviarOfertas {

}
