import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { Back } from '../../components/back/back';
@Component({
  selector: 'app-pedidos-clientes',
  imports: [AdminFooter,Back],
  templateUrl: './pedidos-clientes.html',
  styleUrl: './pedidos-clientes.css'
})
export class PedidosClientes {

}
