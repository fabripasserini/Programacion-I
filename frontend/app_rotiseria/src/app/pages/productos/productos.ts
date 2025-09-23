import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-productos',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}
