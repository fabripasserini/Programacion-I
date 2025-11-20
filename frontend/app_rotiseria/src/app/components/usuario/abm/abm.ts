import { Component, Input, OnInit } from '@angular/core';
import { Usuarios } from '../../../services/usuarios';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reg } from '../../../services/reg';
@Component({
  selector: 'app-abm',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmComponent implements OnInit {
  formUsuario: FormGroup;

  @Input() userId!: string;
  @Input() tipoOperacion!: string;

  constructor(
    private usuariosSvc: Usuarios,
    private formBuilder: FormBuilder,
    private regService: Reg,

  ) {
    this.formUsuario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      rol: ['', Validators.required],
      alta: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.userId) {
      this.usuariosSvc.getUsuario(Number(this.userId)).subscribe({
        next: (res) => {
          console.log('Usuario recibido:', res);
          // 👇 actualizamos el formulario con los datos
          this.formUsuario.patchValue(res);
        },
        error: (err) => console.error('Error al obtener usuario:', err)
      });
    }
  }
  createUsuario() {
    // {
    //     email: this.loginForm.value.email, 
    //     password: this.loginForm.value.password}
    this.regService.register(this.formUsuario.value).subscribe({
      next: (res:any) => {
        alert("Registro exitoso");
        console.log("Respuesta registro: ", res);
      },
      error: (err) => {
        alert("Error");
        console.log("Error en el registro:", err);
      }
    }) 
  }
  updateUsuario() {
    if (this.formUsuario.valid) {
      const data = { id: this.userId, ...this.formUsuario.value };
      if (!data.password)  delete data.password;
      this.usuariosSvc.updateUsuario(data).subscribe({
        next: (res) => {
          console.log('Usuario actualizado:', res);
          alert('Usuario modificado correctamente');
        },
        error: (err) => console.error('Error al modificar usuario:', err)
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

  deleteUsuario(id: string) {
    return this.usuariosSvc.deleteUsuario(Number(id));
  }
  }
