import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Usuarios {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getUsuarios(): Observable<any> {
    return this.http.get(this.url + '/usuarios', { headers: this.headers });
  }
  getUsuario(id: number): Observable<any> {
    return this.http.get(this.url + '/usuario/' + id, { headers: this.headers });
  }

  deleteUsuario(id: number) {
    this.http.delete(this.url + '/usuario/' + id, { headers: this.headers })
      .subscribe({
        next: (res) => {
          console.log('Usuario eliminado:', res);
        },
        
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
  }

  updateUsuario(usuario: any): Observable<any> {
    return this.http.put(this.url + '/usuario/' + usuario.id, usuario,{ headers: this.headers });
  }


}
