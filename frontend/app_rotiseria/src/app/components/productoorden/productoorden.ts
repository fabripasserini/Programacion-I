import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-productoorden',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './productoorden.html',
  styleUrl: './productoorden.css'
})
export class Productoorden {
  @Input() titulo!: string;
  @Input() precio!: string;
  @Input() cantidad!: number;
  @Input() imagenSrc!: string;
  @Input() imagenAlt!: string;
  @Input() estado!: 'proceso' | 'completado' | 'cancelado';
}
