import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './boton.html',
  styleUrl: './boton.css'
})
export class Boton {
  @Input() textoboton!: string;
  @Input() link!: string;
}
