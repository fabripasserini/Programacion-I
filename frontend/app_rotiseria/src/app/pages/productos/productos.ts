import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checkrol } from '../../services/checkrol';
import { Back } from '../../components/back/back';
import { CommonModule } from '@angular/common';  

import { Footerunico } from '../../components/footerunico/footerunico';
import { VerProducto } from '../../components/producto/ver-producto/ver-producto';
import { SetbackgroundService} from '../../services/setbackground';
@Component({
  selector: 'app-productos',
  imports: [Footerunico,Back,VerProducto,CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  userId!: string;
    tipo_op!: string;
    usuario: any = {};
    fondo = '';
    constructor(
      private route:ActivatedRoute,
      private setbackgroundService: SetbackgroundService
    ){}

    ngOnInit(){
      this.userId = this.route.snapshot.paramMap.get('id') || '';
      this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';

      console.log("user id: ", this.userId);
      console.log("tipo operacion: ", this.tipo_op);
      console.log("usuario rol: ", this.usuario.rol);

      this.fondo=this.setbackgroundService.getFondo();
      
    }
  } 
