import { Component } from '@angular/core';
import { AbmComponent } from "../../components/usuario/abm/abm";
import { ActivatedRoute } from '@angular/router';
import { Back } from '../../components/back/back';
import { CommonModule } from '@angular/common';  
import { GetUserInfo } from '../../services/getuserinfo';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [  AbmComponent, Back,CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent {
  userId!: string;
  tipo_op!: string;
  usuario: any = {};
  fondo = '';
  constructor(
    private route:ActivatedRoute,
    private userInfo: GetUserInfo
  ){}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';

    console.log("user id: ", this.userId);
    console.log("tipo operacion: ", this.tipo_op);
    this.usuario.rol=this.userInfo.getRol();

    if (this.usuario.rol === 'admin') {
        this.fondo = 'bg-admin';
      } else if (this.usuario.rol === 'empleado') {
        this.fondo = 'bg-empleado';
        }
    
  }
} 

