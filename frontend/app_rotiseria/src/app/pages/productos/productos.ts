import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Back } from '../../components/back/back';
import { CommonModule } from '@angular/common';  

import { Footerunico } from '../../components/footerunico/footerunico';
import { VerProducto } from '../../components/producto/ver-producto/ver-producto';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [Footerunico,Back,VerProducto,CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  fondo = '';
  selectedCategoryId: number | null = null;
  
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(){

    this.route.queryParamMap.subscribe(params => {
      console.log('Params recibidos en productos.ts:', params);
      const categoryId = params.get('id_categoria');
      this.selectedCategoryId = categoryId ? parseInt(categoryId) : null;
    });
  }
}
