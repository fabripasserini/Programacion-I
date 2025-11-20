import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetUserInfo } from './services/getuserinfo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  
  protected readonly title = signal('app_rotiseria');

  constructor(private userInfo: GetUserInfo) {}

  ngOnInit(): void {
    // Obtener rol del usuario
    const rol = this.userInfo.getRol();

    // Determinar clase de fondo según rol
    let fondo = '';
    if (rol === 'admin') {
      fondo = 'bg-admin';
    } else if (rol === 'empleado') {
      fondo = 'bg-empleado';
    } else {
      fondo = 'bg-user';
    }

    // Aplicar fondo al body
    document.body.classList.remove('bg-admin', 'bg-empleado', 'bg-user');
    document.body.classList.add(fondo);
  }
}
