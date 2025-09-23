import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-agregar-productos',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './agregar-productos.html',
  styleUrl: './agregar-productos.css'
})
export class AgregarProductos {

}
