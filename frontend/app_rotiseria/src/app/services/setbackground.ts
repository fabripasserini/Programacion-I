import { Injectable } from '@angular/core';
import { GetUserInfo } from './getuserinfo';
@Injectable({
  providedIn: 'root'
})
export class SetbackgroundService {
  usuario: any = {};
  fondo = '';

  constructor(private userInfo: GetUserInfo) {
    this.inicializar();
  }

  public inicializar(): void {
    this.usuario.rol = this.userInfo.getRol();
    
    if (this.usuario.rol === 'admin') {
      this.fondo = 'bg-admin';
    } else if (this.usuario.rol === 'empleado') {
      this.fondo = 'bg-empleado';
    } else {
      this.fondo = 'bg-user';
    }
  }

  getFondo(): string {
    return this.fondo;
  }
}

