import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-ordencancelada',
  imports: [
    CommonModule,
    Back,
    Footerunico
  ],
  templateUrl: './ordencancelada.html',
  styleUrl: './ordencancelada.css'
})
export class Ordencancelada {

}
