import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-estado-pedidos',
  imports: [Back,EmpleadoFooter],
  templateUrl: './estado-pedidos.html',
  styleUrl: './estado-pedidos.css'
})
export class EstadoPedidos {

}
