import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Checkordenc } from '../../components/checkordenc/checkordenc';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-ordencancelada',
  imports: [
    CommonModule,
    Back,
    Checkordenc,
    Footerunico
  ],
  templateUrl: './ordencancelada.html',
  styleUrl: './ordencancelada.css'
})
export class Ordencancelada {

}
