import { Component } from '@angular/core';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';
import { AdminFooter } from '../../components/admin-footer/admin-footer';

@Component({
  selector: 'app-eliminar-productos',
  imports: [FlechaVolver,AdminFooter],
  templateUrl: './eliminar-productos.html',
  styleUrl: './eliminar-productos.css'
})
export class EliminarProductos {

}
