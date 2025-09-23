import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Checkordenc } from '../../components/checkordenc/checkordenc';
import { FooterCliente } from '../../components/footer-cliente/footer-cliente';

@Component({
  selector: 'app-ordencancelada',
  imports: [
    CommonModule,
    Back,
    Checkordenc,
    FooterCliente
  ],
  templateUrl: './ordencancelada.html',
  styleUrl: './ordencancelada.css'
})
export class Ordencancelada {

}
