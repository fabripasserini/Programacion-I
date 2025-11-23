import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet,Router, NavigationEnd } from '@angular/router';
import { GetUserInfo } from './services/getuserinfo';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  
  protected readonly title = signal('app_rotiseria');

  constructor(private userInfo: GetUserInfo, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Remover todas las clases de fondo en cada navegación
      document.body.classList.remove('bg-admin', 'bg-empleado', 'bg-user', 'bg-index');

      if (event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/') {
        // Aplicar una clase específica para home
        document.body.classList.add('bg-dark');
      } else {
        const rol = this.userInfo.getRol();
        let fondo = '';
        if (rol === 'admin') {
          fondo = 'bg-admin';
        } else if (rol === 'empleado') {
          fondo = 'bg-empleado';
        } else {
          fondo = 'bg-user';
        }
        document.body.classList.add(fondo);
      }
    });
  }
}
