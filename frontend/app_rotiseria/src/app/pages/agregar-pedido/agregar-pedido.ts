import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';

@Component({
  selector: 'app-agregar-pedido',
  imports: [Back,EmpleadoFooter],
  templateUrl: './agregar-pedido.html',
  styleUrl: './agregar-pedido.css'
})
export class AgregarPedido {

}
