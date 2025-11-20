import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GetUserInfo {
  private usuario: any = {};
  
  constructor() {
    this.refreshUserInfo();
  }

  refreshUserInfo(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        this.usuario.rol = decoded.rol;
        this.usuario.id = decoded.id;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        this.clearUserInfo();
      }
    } else {
      console.warn("No hay token en localStorage");
      this.clearUserInfo();
    }
  }

  clearUserInfo(): void {
    this.usuario = {};
  }

  getRol(): string | null {
    if (!this.usuario.rol) {
      this.refreshUserInfo();
    }
    return this.usuario.rol || null;
  }

  getId(): number | null {
    if (!this.usuario.id) {
      this.refreshUserInfo();
    }
    return this.usuario.id || null;
  }
}
