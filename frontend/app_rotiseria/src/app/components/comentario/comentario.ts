import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css'
})
export class Comentario {
  comment: string = '';

  constructor() { }
}
