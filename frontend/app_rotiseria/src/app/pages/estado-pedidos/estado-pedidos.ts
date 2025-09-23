import { Component } from '@angular/core';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-estado-pedidos',
  imports: [FlechaVolver,EmpleadoFooter],
  templateUrl: './estado-pedidos.html',
  styleUrl: './estado-pedidos.css'
})
export class EstadoPedidos {

}
