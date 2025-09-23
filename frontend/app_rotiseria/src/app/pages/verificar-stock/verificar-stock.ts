import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-verificar-stock',
  imports: [Back,EmpleadoFooter],
  templateUrl: './verificar-stock.html',
  styleUrl: './verificar-stock.css'
})
export class VerificarStock {

}
