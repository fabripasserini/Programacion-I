import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Back } from '../../components/back/back';
@Component({
  selector: 'app-error-page',
  imports: [Back,RouterLink],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css'
})
export class ErrorPage {

}
