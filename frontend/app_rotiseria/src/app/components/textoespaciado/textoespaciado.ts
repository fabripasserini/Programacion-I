import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textoespaciado',
  imports: [
    CommonModule
  ],
  templateUrl: './textoespaciado.html',
  styleUrl: './textoespaciado.css'
})
export class Textoespaciado {
  @Input() etiqueta!: string;
  @Input() valor!: string;
}



