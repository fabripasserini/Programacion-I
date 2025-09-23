import { Component } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { FlechaVolver } from '../../components/flecha-volver/flecha-volver';

@Component({
  selector: 'app-inicio-admin',
  imports: [AdminFooter,FlechaVolver],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css'
})
export class InicioAdmin {

}
