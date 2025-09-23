import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-modificar-productos',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './modificar-productos.html',
  styleUrl: './modificar-productos.css'
})
export class ModificarProductos {

}
