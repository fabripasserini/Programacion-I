import { Component, OnInit } from '@angular/core';
import { GetUserInfo } from '../../services/getuserinfo';
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

  constructor(private userInfo: GetUserInfo) {}

  ngOnInit(): void {
    this.rol = this.userInfo.getRol();
    console.log("Rol detectado:", this.rol);
  }

}




