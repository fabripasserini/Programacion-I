import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { Back } from '../../components/back/back';
@Component({
  selector: 'app-productos',
  imports: [AdminFooter,Back],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}
