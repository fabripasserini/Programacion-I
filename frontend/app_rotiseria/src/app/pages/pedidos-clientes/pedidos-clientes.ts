import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-pedidos-clientes',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './pedidos-clientes.html',
  styleUrl: './pedidos-clientes.css'
})
export class PedidosClientes {

}
