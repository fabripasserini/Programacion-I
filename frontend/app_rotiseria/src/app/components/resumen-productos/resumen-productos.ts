import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-productos.html',
  styleUrl: './resumen-productos.css'
})
export class ResumenProductos {
  @Input() productos: any[] = [];
  @Input() subtotal: number = 0;
  @Input() total: number = 0;
  @Input() mostrarResumen: boolean = true;
  @Input() mensajeVacio: string = 'No hay productos';
}