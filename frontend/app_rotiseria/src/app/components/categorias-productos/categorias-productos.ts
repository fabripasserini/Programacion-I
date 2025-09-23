import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias-productos',
  imports: [CommonModule, RouterModule],
  templateUrl: './categorias-productos.html',
  styleUrl: './categorias-productos.css'
})
export class CategoriasProductos {
  @Input() titulo!: string;
  @Input() imageSrc!: string;
  @Input() link!: string;
}



