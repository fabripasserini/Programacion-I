import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VerCategorias } from '../../services/categorias';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [RouterLink, FormsModule, ProductCard],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias {

  nombre!: string;

  arrayCategorias: any[] = [];
  arrayFiltred: any[] = [];

  constructor(
    private router: Router,
    private categoriasSvc: VerCategorias
  ) {}

  ngOnInit() {
    this.categoriasSvc.getCategorias().subscribe({
      next: (res: any) => {
        console.log('Categorias: ', res);
        this.arrayCategorias = res;
        this.arrayFiltred = [...res];

      },
      error: (err) => {
        console.log('Error al traer categorias: ', err);
      }
    });
  }
}
