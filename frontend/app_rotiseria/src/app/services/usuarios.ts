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

  eliminarUsuario(id: number) {
    this.http.delete(this.url + '/usuario/' + id, { headers: this.headers })
      .subscribe({
        next: (res) => {
          console.log('Usuario eliminado:', res);
          // vuelve a la página anterior
        },
        
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
  }

  updateUsuario(usuario: any, dataUpdate: UserUpdate): Observable<any> {
    return this.http.put(this.url + '/usuario/' + usuario.id, dataUpdate, { headers: this.headers });
  }

  createUsuario(dataCreate: UserCreate): Observable<any> {
    return this.http.post(this.url + '/usuarios', dataCreate, { headers: this.headers });
  }
}
