import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-estado-pedidos',
  imports: [Back, Footerunico],
  templateUrl: './estado-pedidos.html',
  styleUrl: './estado-pedidos.css'
})
export class EstadoPedidos {

}
