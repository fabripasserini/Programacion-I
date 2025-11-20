import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isToken(){
    return localStorage.getItem("token"); //si existe un token o no
  }
  hasRights(){
    const rol = localStorage.getItem("rol");
    if (rol === 'admin' || rol === 'empleado'){
      return true;
    }else{
      return false;
    }
  }
 
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
     }
}
