import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productoresena',
  standalone: true,
  imports: [],
  templateUrl: './productoresena.html',
  styleUrl: './productoresena.css'
})
export class Productoresena {
  @Input() titulo!: string;
  @Input() imagenSrc!: string;
  @Input() imagenAlt!: string;
}



