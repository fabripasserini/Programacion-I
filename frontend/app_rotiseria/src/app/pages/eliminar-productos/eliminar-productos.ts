import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { AdminFooter } from '../../components/admin-footer/admin-footer';

@Component({
  selector: 'app-eliminar-productos',
  imports: [Back,AdminFooter],
  templateUrl: './eliminar-productos.html',
  styleUrl: './eliminar-productos.css'
})
export class EliminarProductos {

}
