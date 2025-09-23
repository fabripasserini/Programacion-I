import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [Navbar,RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
}
