import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estrellas',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './estrellas.html',
  styleUrl: './estrellas.css'
})
export class Estrellas implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  currentRating: number = 0;
  hoveredRating: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  hoverRating(rating: number) {
    this.hoveredRating = rating;
  }

  setRating(rating: number) {
    this.currentRating = rating;
    this.hoveredRating = rating;
    console.log(`Calificación seleccionada: ${this.currentRating}`);
  }

  resetRating() {
    this.hoveredRating = this.currentRating;
  }
}