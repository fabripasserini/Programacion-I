import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-contacto',
  imports: [RouterLink,Navbar],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

}
