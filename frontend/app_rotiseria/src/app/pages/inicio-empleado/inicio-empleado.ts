import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-inicio-empleado',
  imports: [Back, EmpleadoFooter],
  templateUrl: './inicio-empleado.html',
  styleUrl: './inicio-empleado.css'
})
export class InicioEmpleado {

}
