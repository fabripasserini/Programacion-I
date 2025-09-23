import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-titulos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './titulos.html',
  styleUrl: './titulos.css'
})
export class Titulos {
  @Input() titulo!: string;
}


