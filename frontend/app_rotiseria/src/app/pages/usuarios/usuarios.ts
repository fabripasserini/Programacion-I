import { Component } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { Navbar } from '../../components/navbar/navbar';
import { VerUser } from "../../components/usuario/ver-user/ver-user";

@Component({
  selector: 'app-usuarios',
  imports: [
    Footer,
    Navbar,
    VerUser
],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

}