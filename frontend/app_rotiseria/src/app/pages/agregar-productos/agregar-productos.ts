import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { Back } from '../../components/back/back';

@Component({
  selector: 'app-agregar-productos',
  imports: [AdminFooter,Back],
  templateUrl: './agregar-productos.html',
  styleUrl: './agregar-productos.css'
})
export class AgregarProductos {

}
