import { Injectable,Inject, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class Productos {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getProductos(): Observable<any> {
    return this.http.get(this.url + '/productos', { headers: this.headers });
  }
  getProducto(id: number): Observable<any> {
    return this.http.get(this.url + '/producto/' + id, { headers: this.headers });
  }
  createProducto(dataCreate: ProductCreate): Observable<any> {
    return this.http.post(this.url + '/productos', dataCreate, { headers: this.headers });
  }
  deleteProducto(id: number) {
    this.http.delete(this.url + '/producto/' + id, { headers: this.headers })
      .subscribe({
        next: (res) => {
          console.log('Producto eliminado:', res);
        },
        
        error: (err) => console.error('Error al eliminar producto:', err)
      });
  }

  updateProducto(producto: any): Observable<any> {
    return this.http.put(this.url + '/producto/' + producto.id, producto,{ headers: this.headers });
  }


}
