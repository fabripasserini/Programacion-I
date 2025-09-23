import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-modificar-pedidos',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './modificar-pedidos.html',
  styleUrl: './modificar-pedidos.css'
})
export class ModificarPedidos {

}
