import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-agregar-pedido',
  imports: [Back,Footerunico],
  templateUrl: './agregar-pedido.html',
  styleUrl: './agregar-pedido.css'
})
export class AgregarPedido {

}
