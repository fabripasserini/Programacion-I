import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Checkrol {
  private usuario: any = {};

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        this.usuario.rol = decoded.rol;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      console.warn("No hay token en localStorage");
    }
  }

  getRol(): string | null {
    return this.usuario.rol || null;
  }
}
