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
    if (!token) {
      this.clearUserInfo();
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      this.usuario = {
        rol: decoded.rol,
        id: decoded.id,
        alta: decoded.alta,
        bloquear: decoded.bloquear,
      };
    } catch (error) {
      console.error("Error al decodificar token:", error);
      this.clearUserInfo();
    }
  }

  clearUserInfo(): void {
    this.usuario = {};
  }

  getRol(): string | null {
    if (!this.usuario.rol) this.refreshUserInfo();
    return this.usuario.rol ?? null;
  }

  getId(): number | null {
    if (!this.usuario.id) this.refreshUserInfo();
    return this.usuario.id ?? null;
  }

  getBloqueado(): boolean {
    if (this.usuario.bloquear === undefined) this.refreshUserInfo();
    return this.usuario.bloquear ?? false;
  }

  getAlta(): boolean {
    if (this.usuario.alta === undefined) this.refreshUserInfo();
    return this.usuario.alta ?? false;
  }
}
