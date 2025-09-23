import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true, 
  imports: [
    CommonModule
  ], 
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() titulo!: string;
  @Input() texto!: string;
  @Input() precio!: string;
  @Input() imagenSrc!: string;
  @Input() imagenAlt!: string;

}