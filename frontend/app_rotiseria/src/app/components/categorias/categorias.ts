import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias as CategoriasService } from '../../services/categorias';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias {

  nombre!: string;
  arrayCategorias: any[] = [];
  arrayFiltred: any[] = [];

  constructor(
    private router: Router,
    private categoriasSvc: CategoriasService 
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

  onCategorySelect(categoryId: number): void {
    // Navegar directamente a productos con el categoryId
    this.router.navigate(['/productos'], { 
      queryParams: { 
        categoria: categoryId 
      } 
    });
  }
}