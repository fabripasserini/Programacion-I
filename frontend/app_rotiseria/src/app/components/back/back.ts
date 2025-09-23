import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back',
  imports: [],
  templateUrl: './back.html',
  styleUrl: './back.css'
})
export class Back {
  // Inyecta el servicio Location en el constructor
  constructor(private location: Location) { }

  /**
   * Navega de vuelta a la página anterior en el historial del navegador.
   * Se utiliza en el evento (click) del botón en el template.
   */
  goBack(): void {
    this.location.back();
  }
}


