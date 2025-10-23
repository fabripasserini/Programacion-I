import { Component } from '@angular/core';
import { AbmProducto } from '../../components/producto/abm/abm';
import { ActivatedRoute } from '@angular/router';
import { Back } from '../../components/back/back';
import { CommonModule } from '@angular/common';  
import { SetbackgroundService} from '../../services/setbackground';

@Component({
  selector: 'app-producto',
  imports: [AbmProducto,Back,CommonModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent {
  productoId!: string;
  tipo_op!: string;
  fondo = '';
  constructor(
    private route:ActivatedRoute,
    private setbackgroundService: SetbackgroundService

  ){}
  ngOnInit(){
    this.productoId = this.route.snapshot.paramMap.get('id') || '';
    this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';
    this.fondo=this.setbackgroundService.getFondo();

  }
}
