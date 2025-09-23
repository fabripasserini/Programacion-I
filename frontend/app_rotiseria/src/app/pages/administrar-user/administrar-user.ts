import { Component } from '@angular/core';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';
import { Back } from '../../components/back/back';

@Component({
  selector: 'app-administrar-user',
  imports: [EmpleadoFooter,Back],
  templateUrl: './administrar-user.html',
  styleUrl: './administrar-user.css'
})
export class AdministrarUser {

}
