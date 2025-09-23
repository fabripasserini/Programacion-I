import { Component } from '@angular/core';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-administrar-user',
  imports: [EmpleadoFooter,FlechaVolver],
  templateUrl: './administrar-user.html',
  styleUrl: './administrar-user.css'
})
export class AdministrarUser {

}
