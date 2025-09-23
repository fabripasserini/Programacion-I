import { Component } from '@angular/core';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-verificar-stock',
  imports: [FlechaVolver,EmpleadoFooter],
  templateUrl: './verificar-stock.html',
  styleUrl: './verificar-stock.css'
})
export class VerificarStock {

}
