import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productocarrito',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './productocarrito.html',
  styleUrl: './productocarrito.css'
})
export class Productocarrito {
  @Input() imagen: string = '';
  @Input() nombre: string = '';
  @Input() precio: number = 0;
  @Input() cantidad: number = 0;
}
