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

  getProductosPorCategoria(categoriaId: number): Observable<any> {
    return this.http.get(this.url + '/productos?categoria=' + categoriaId);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get(this.url + '/producto/' + id);
  }
  createProducto(dataCreate: ProductCreate): Observable<any> {
    return this.http.post(this.url + '/productos', dataCreate);
  }
  deleteProducto(id: number) {
  return this.http.delete(this.url + '/producto/' + id);
}


  updateProducto(producto: any): Observable<any> {
    return this.http.put(this.url + '/producto/' + producto.id_producto, producto);
  }


}
