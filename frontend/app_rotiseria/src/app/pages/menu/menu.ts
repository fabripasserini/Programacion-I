import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Categorias } from '../../components/categorias/categorias';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Footerunico,
    Categorias
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}


