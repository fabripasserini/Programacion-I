import { Injectable,Inject, inject } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class Productos {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

 getProductos(page: number, limit: number, nombre: string = '', criterio: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', limit)
      .set(criterio, nombre); // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/productos', { params });
  }
  getProducto(id: number): Observable<any> {
    return this.http.get(this.url + '/producto/' + id);
  }
  createProducto(dataCreate: ProductCreate): Observable<any> {
    return this.http.post(this.url + '/productos', dataCreate);
  }
  deleteProducto(id: number) {
    this.http.delete(this.url + '/producto/' + id)
      .subscribe({
        next: (res) => {
          console.log('Producto eliminado:', res);
        },
        
        error: (err) => console.error('Error al eliminar producto:', err)
      });
  }

  updateProducto(producto: any): Observable<any> {
    return this.http.put(this.url + '/producto/' + producto.id, producto);
  }


}
