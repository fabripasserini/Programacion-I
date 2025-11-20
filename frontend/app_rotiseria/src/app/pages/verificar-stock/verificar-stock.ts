import { Component } from '@angular/core';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-verificar-stock',
  imports: [Back, Footerunico],
  templateUrl: './verificar-stock.html',
  styleUrl: './verificar-stock.css'
})
export class VerificarStock {

}
