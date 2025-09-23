import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';
@Component({
  selector: 'app-usuarios',
  imports: [AdminFooter, FlechaVolver],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

}
