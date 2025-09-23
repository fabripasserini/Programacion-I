import { Component } from '@angular/core';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-inicio-empleado',
  imports: [FlechaVolver,EmpleadoFooter],
  templateUrl: './inicio-empleado.html',
  styleUrl: './inicio-empleado.css'
})
export class InicioEmpleado {

}
