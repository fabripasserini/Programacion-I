import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { Reg } from '../../services/reg';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [Navbar,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  registerForm: FormGroup;

  constructor(
    private regService: Reg,
    private router: Router,
    private formBuilder: FormBuilder
    
  ){
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  

  irRegister(){
    // {
    //     email: this.loginForm.value.email, 
    //     password: this.loginForm.value.password}
    this.regService.register(this.registerForm.value).subscribe({
      next: (res:any) => {
        alert("Registro exitoso");
        console.log("Respuesta registro: ", res);
        this.router.navigateByUrl('/login')
      },
      error: (err) => {
        alert("Error");
        console.log("Error en el registro:", err);
      }
    }) 
  }

  submit(){
    console.log("Valores form: ", this.registerForm.value);
    if(this.registerForm.valid){
      this.irRegister();
    } else {
      alert("Formulario inválido")
    }
  }
}

