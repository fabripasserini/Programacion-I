import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  
  imports: [Navbar,RouterLink,ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
    private formBuilder: FormBuilder
    //private services/usuario: services/usuario, 
    
  ){
    this.loginForm = this.formBuilder.group({
      email: ['aca va el mail', Validators.required],
      password: ['123456', Validators.required]
    });
  }

  irLogin(){
    // {
    //     email: this.loginForm.value.email, 
    //     password: this.loginForm.value.password}
    this.authService.login(this.loginForm.value).subscribe({
      next: (res:LoginResponse) => {
        alert("Login exitoso");
        console.log("Respuesta login: ", res);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('rol', res.rol);
        this.router.navigateByUrl('/menu') //queda que todo usuario nuevo se vaya a una pantalla que le diga que tiene que ser validado
        // if(res.rol === 'admin' || res.rol === 'empleado')
        //   this.router.navigateByUrl('/inicio')
        // else
        //   this.router.navigateByUrl('/menu')
      },
      error: (err) => {
        alert("Usuario o contraseña incorrectos");
        console.log("Error en el login:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
    }) 
  }

  submit(){
    console.log("Valores form: ", this.loginForm.value);
    if(this.loginForm.valid){
      this.irLogin();
    } else {
      alert("Formulario inválido")
    }
  }
}

