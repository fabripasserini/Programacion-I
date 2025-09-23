import { Component } from '@angular/core';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-agregar-pedido',
  imports: [FlechaVolver,EmpleadoFooter],
  templateUrl: './agregar-pedido.html',
  styleUrl: './agregar-pedido.css'
})
export class AgregarPedido {

}
