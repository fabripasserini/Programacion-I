import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
@Component({
  selector: 'app-pedidos-clientes',
  imports: [Footerunico,Back],
  templateUrl: './pedidos-clientes.html',
  styleUrl: './pedidos-clientes.css'
})
export class PedidosClientes {

}
