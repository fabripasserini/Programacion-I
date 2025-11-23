import { Component, OnInit } from '@angular/core';
import { Notificaciones as NotificacionesService } from '../../services/notificaciones';
import { GetUserInfo } from '../../services/getuserinfo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../../services/usuarios';
import { Router } from '@angular/router';
import { Titulos } from '../../components/titulos/titulos';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule,Titulos],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones implements OnInit {
  notificaciones: any[] = [];
  userId: number | null = null;

  mostrarInputMultiplesUsuarios: boolean = false;
  mostrarUnicoUsuario: boolean = false;

  mensaje: string = '';
  contador: number = 0;

  userEmail: string = '';
  emailsMultiples: string = '';
  activeTab = 'ver';
  ordenActual: 'asc' | 'desc' = 'desc';

  destinatarioSeleccionado: string = 'todos';

  constructor(
    private notificacionesSvc: NotificacionesService,
    private userInfo: GetUserInfo,
    private usuariosSvc: Usuarios,
    private router: Router
  ) {
    this.userId = this.userInfo.getId();
  }

  ngOnInit(): void {
    if (this.userId !== null) {
      this.getNotificaciones(this.userId);
    }
  }

  // =====================================================================
  // Destinatarios
  // =====================================================================
  cambiarDestinatario(event: any) {
    this.destinatarioSeleccionado = event.target.value;

    this.mostrarInputMultiplesUsuarios = this.destinatarioSeleccionado === 'multiples';
    this.mostrarUnicoUsuario = this.destinatarioSeleccionado === 'usuario';
  }

  // =====================================================================
  // Enviar notificación
  // =====================================================================
  enviarNotificacion() {

    if (!this.mensaje.trim()) {
      alert("El mensaje no puede estar vacío");
      return;
    }

    // ============================================================
    // 1️⃣ TODOS LOS USUARIOS → una sola request
    // ============================================================
    if (this.destinatarioSeleccionado === 'todos') {

      this.notificacionesSvc.createNotificacion({
        usuarios: "todos",
        informacion: this.mensaje
      }).subscribe({
        next: () => {
          alert("Notificaciones enviadas a todos los usuarios!");
          this.refrescarPagina();
        }
      });

      return;
    }

    // ============================================================
    // 2️⃣ MÚLTIPLES USUARIOS
    // ============================================================
    if (this.destinatarioSeleccionado === 'multiples') {

      const emails = this.emailsMultiples
        .split(/[\s,]+/)
        .map(e => e.trim())
        .filter(e => this.validarEmail(e));

      if (emails.length === 0) {
        alert("Ingresa al menos un email válido.");
        return;
      }

      let noEncontrados: string[] = [];

      emails.forEach(email => {
        this.getUserIdViaEmail(email).subscribe({
          next: (res: any) => {
            const usuario = res.usuarios?.[0];

            if (!usuario) {
              noEncontrados.push(email);
              return;
            }

            this.notificacionesSvc.createNotificacion({
              usuarios: [usuario.id],
              informacion: this.mensaje
            }).subscribe();
          },
          error: err => console.error("Error al buscar usuario:", err)
        });
      });

      setTimeout(() => {
        if (noEncontrados.length > 0) {
          alert("Los siguientes emails no existen:\n" + noEncontrados.join("\n"));
        } else {
          alert("Notificaciones enviadas a múltiples usuarios!");
        }
        this.refrescarPagina();
      }, 500);

      return;
    }

    // ============================================================
    // 3️⃣ UN SOLO USUARIO
    // ============================================================
    this.getUserIdViaEmail(this.userEmail).subscribe({
      next: (res: any) => {
        const usuario = res.usuarios?.[0];

        if (!usuario) {
          alert("No se encontró ningún usuario con ese email.");
          return;
        }

        this.notificacionesSvc.createNotificacion({
          usuarios: [usuario.id],
          informacion: this.mensaje
        }).subscribe({
          next: () => {
            alert("Notificación enviada!");
            this.refrescarPagina();
          },
          error: err => console.error("Error al enviar:", err)
        });
      },
      error: err => console.error("Error al buscar usuario:", err)
    });
  }

  // =====================================================================
  // Utilidades
  // =====================================================================

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  refrescarPagina() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/notificaciones']);
    });
  }

  actualizarContador() {
    this.contador = this.mensaje.length;
  }

  // =====================================================================
  // Servicios
  // =====================================================================
  getUserIdViaEmail(email: string) {
    return this.usuariosSvc.getUsuariosSinPaginacion(email, 'email');
  }

  getNotificaciones(userId: number): void {
    this.notificacionesSvc.getNotificaciones(userId).subscribe({
      next: (res: any) => this.notificaciones = res,
      error: err => console.error("Error al traer notificaciones:", err)
    });
  }
  getRol(): any {
    return this.userInfo.getRol()!;
  }
  onTabChange(tab: string) {
  this.activeTab = tab;
}
 getUserId(): any {
    this.userId= this.userInfo.getId();
  }
cambiarOrden() {
  this.ordenActual = this.ordenActual === 'desc' ? 'asc' : 'desc';
  this.getNotificacionesOrdenadas();
}
getNotificacionesOrdenadas() {
  
  this.notificacionesSvc.getNotificaciones(this.userId!, this.ordenActual).subscribe({
    next: (res: any) => {
      this.notificaciones = res;
    }
  });
}
eliminarNotificacion(id: number) {
  this.notificacionesSvc.eliminarNotificacion(id).subscribe({
    next: () => {
      this.notificaciones = this.notificaciones.filter(n => n.id !== id);
    }
  });
}

}
