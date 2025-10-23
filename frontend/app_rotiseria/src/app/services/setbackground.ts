import { Injectable } from '@angular/core';
import { Checkrol } from './checkrol';
@Injectable({
  providedIn: 'root'
})
export class SetbackgroundService {
  usuario: any = {};
  fondo = '';

  constructor(private checkrol: Checkrol) {
    this.inicializar();
  }

  private inicializar(): void {
    this.usuario.rol = this.checkrol.getRol();
    
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

