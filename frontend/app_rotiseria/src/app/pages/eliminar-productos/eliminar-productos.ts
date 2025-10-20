import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-eliminar-productos',
  imports: [Back, Footerunico],
  templateUrl: './eliminar-productos.html',
  styleUrl: './eliminar-productos.css'
})
export class EliminarProductos {

}
