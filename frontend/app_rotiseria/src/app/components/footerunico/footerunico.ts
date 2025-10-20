import { Component, OnInit } from '@angular/core';
import { Checkrol } from '../../services/checkrol';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-footerunico',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footerunico.html',
  styleUrl: './footerunico.css'
})
export class Footerunico implements OnInit {
  rol: string | null = null;

  constructor(private checkRol: Checkrol) {}

  ngOnInit(): void {
    this.rol = this.checkRol.getRol();
    console.log("Rol detectado:", this.rol);
  }

}




