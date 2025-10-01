import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { AbmComponent } from "../../components/usuario/abm/abm";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [Navbar, Footer, AbmComponent],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent {
  userId!: string;
  tipo_op!: string;

  constructor(
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.tipo_op = this.route.snapshot.paramMap.get('tipo_op') || '';

    console.log("user id: ", this.userId);
    console.log("tipo operacion: ", this.tipo_op);
    
  }
} 