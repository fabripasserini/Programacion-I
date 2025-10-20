import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Back } from '../../components/back/back';
import { Titulos } from '../../components/titulos/titulos';
import { Estadopedido } from '../../components/estadopedido/estadopedido';
import { Productoorden } from '../../components/productoorden/productoorden';
import { Footerunico } from '../../components/footerunico/footerunico';

@Component({
  selector: 'app-pedidoscancelados',
  standalone: true,
  imports: [
    CommonModule,
    Back,
    Titulos,
    Footerunico,
    Estadopedido,
    Productoorden
  ],
  templateUrl: './pedidoscancelados.html',
  styleUrl: './pedidoscancelados.css'
})
export class Pedidoscancelados {

}
