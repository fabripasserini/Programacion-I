import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Back } from '../../components/back/back';
import { Footerunico } from '../../components/footerunico/footerunico';
import { CommonModule } from '@angular/common';  
import { Checkrol } from '../../services/checkrol';
import { VerUser } from '../../components/usuario/ver-user/ver-user';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [  Back, Footerunico,CommonModule,VerUser],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {
  userId!: string;
  tipo_op!: string;
  usuario: any = {};
  fondo = '';
  constructor(
    private route:ActivatedRoute,
    private checkrol: Checkrol
  ){}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';

    console.log("user id: ", this.userId);
    console.log("tipo operacion: ", this.tipo_op);
    this.usuario.rol=this.checkrol.getRol();
    console.log("usuario rol: ", this.usuario.rol);

    if (this.usuario.rol === 'admin') {
        this.fondo = 'bg-admin';
      } else if (this.usuario.rol === 'empleado') {
        this.fondo = 'bg-empleado';
        }
    
  }
} 