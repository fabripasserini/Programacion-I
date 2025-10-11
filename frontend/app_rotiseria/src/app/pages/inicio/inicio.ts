import { Component, OnInit } from '@angular/core';
import { AdminFooter } from '../../components/admin-footer/admin-footer';
import { Back } from '../../components/back/back';
import { EmpleadoFooter } from '../../components/empleado-footer/empleado-footer';
import { CommonModule } from '@angular/common';  
import { Usuarios } from '../../services/usuarios';
import { jwtDecode } from 'jwt-decode';
import { Checkrol } from '../../services/checkrol';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [AdminFooter, Back, EmpleadoFooter,CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {
  usuario: any = {};
  fondo = '';
  constructor(private checkrol: Checkrol){}
  ngOnInit() {
    this.usuario.rol=this.checkrol.getRol();

    if (this.usuario.rol === 'admin') {
        this.fondo = 'bg-admin';
      } else if (this.usuario.rol === 'empleado') {
        this.fondo = 'bg-empleado';
        }

      } 
  }


//   ngOnInit() {
//   const email = localStorage.getItem('email');
//   if (email) {
//     this.usuariosService.getUsuario(email).subscribe({
//       next: (res) => {
//         this.usuario = res.usuarios?.[0] || null;
// // ver jwt
//         if (this.usuario?.rol === 'admin') {
//           this.fondo = 'bg-admin';
//         } else if (this.usuario?.rol === 'empleado') {
//           this.fondo = 'bg-empleado';
//         }

//         console.log("usuario cargado: ", this.usuario);
//       },
//       error: (err) => {
//         console.error('Error al obtener usuario:', err);
//       }
//     });
//   }
// }


