import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [],
  templateUrl: './back.html',
  styleUrl: './back.css'
})
export class Back {
  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }
}


