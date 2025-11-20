import { Component, OnInit } from '@angular/core';
import { Back } from '../../components/back/back';
import { CommonModule } from '@angular/common';  
import { Usuarios } from '../../services/usuarios';
import { jwtDecode } from 'jwt-decode';
import { GetUserInfo } from '../../services/getuserinfo';
import { Footerunico } from '../../components/footerunico/footerunico';
import { SetbackgroundService } from '../../services/setbackground';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Footerunico, Back,CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {
  usuario: any = {};
  fondo = '';
  constructor(private userInfo: GetUserInfo,
    private setBackgroudSvc: SetbackgroundService,
  ){}
  ngOnInit() {
    this.usuario.rol=this.userInfo.getRol();

    this.setBackgroudSvc.inicializar();

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


