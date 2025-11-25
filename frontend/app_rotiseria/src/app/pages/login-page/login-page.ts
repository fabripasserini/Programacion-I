import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [Navbar, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
      // email: ['admin@admin.com', Validators.required],
      // password: ['admin', Validators.required]
    });
  }

  irLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: LoginResponse) => {
        console.log('Respuesta login:', res);

        localStorage.setItem('token', res.access_token);
        localStorage.setItem('email', res.email);

        const decoded: any = jwtDecode(res.access_token);
        const rol = decoded.rol;
        console.log('Rol decodificado:', rol);

        alert('Login exitoso');

        // redirección según rol
        if (rol === 'admin' || rol === 'empleado') {
          this.router.navigateByUrl('/inicio');
        } else {
          this.router.navigateByUrl('/menu');
        }
      },
      error: (err) => {
        console.log('Error en el login:', err);
        alert('Usuario o contraseña incorrectos');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
    });
  }

  submit() {
    console.log('Valores form:', this.loginForm.value);
    if (this.loginForm.valid) {
      this.irLogin();
    } else {
      alert('Formulario inválido');
    }
  }
}
