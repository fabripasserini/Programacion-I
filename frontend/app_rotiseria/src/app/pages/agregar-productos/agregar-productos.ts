import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-agregar-productos',
  imports: [Footerunico,Back],
  templateUrl: './agregar-productos.html',
  styleUrl: './agregar-productos.css'
})
export class AgregarProductos {

}
