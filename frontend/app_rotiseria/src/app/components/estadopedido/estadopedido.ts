import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-estadopedido',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './estadopedido.html',
  styleUrl: './estadopedido.css'
})
export class Estadopedido {
  @Input() activeTab: 'enproceso' | 'completadas' | 'canceladas' = 'enproceso';
}
