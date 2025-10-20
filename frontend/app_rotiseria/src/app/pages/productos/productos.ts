import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
@Component({
  selector: 'app-productos',
  imports: [Footerunico,Back],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}
