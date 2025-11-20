// perfil.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetUserInfo } from '../../services/getuserinfo';
import { Usuarios as UsuariosService } from '../../services/usuarios';
import { Back } from '../back/back';
import { Footerunico } from '../footerunico/footerunico';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule,Back,Footerunico],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  
  private userInfo = inject(GetUserInfo);
  private usuariosService = inject(UsuariosService);

  usuario: any = null;
  modoEdicion: boolean = false;
  usuarioEditado: any = {};

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    const userId = this.userInfo.getId();
    
    if (!userId) {
      console.error('No hay usuario logueado');
      return;
    }

    this.usuariosService.getUsuario(userId).subscribe({
      next: (res: any) => {
        console.log('Usuario cargado:', res);
        this.usuario = res;
        this.usuarioEditado = { ...res }; // Copia para edición
      },
      error: (err) => {
        console.error('Error al cargar perfil:', err);
      }
    });
  }

  activarEdicion() {
    this.modoEdicion = true;
    this.usuarioEditado = { ...this.usuario };
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.usuarioEditado = { ...this.usuario };
  }

  guardarCambios() {
    const userId = this.userInfo.getId();
    
    if (!userId) return;

    const datosActualizar = {
      id: userId,
      nombre: this.usuarioEditado.nombre,
      apellido: this.usuarioEditado.apellido,
      email: this.usuarioEditado.email,
      telefono: this.usuarioEditado.telefono,
      direccion: this.usuarioEditado.direccion
    };

    this.usuariosService.updateUsuario(datosActualizar).subscribe({
      next: (res) => {
        console.log('Perfil actualizado:', res);
        alert('Perfil actualizado correctamente');
        this.usuario = { ...this.usuarioEditado };
        this.modoEdicion = false;
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        alert('Error al actualizar el perfil');
      }
    });
  }

  getRolNombre(rol: string): string {
    const roles: any = {
      'admin': 'Administrador',
      'user': 'Cliente',
      'empleado': 'Empleado'
    };
    return roles[rol] || rol;
  }

  getRolColor(rol: string): string {
    const colores: any = {
      'admin': 'danger',
      'user': 'primary',
      'empleado': 'success'
    };
    return colores[rol] || 'secondary';
  }
}