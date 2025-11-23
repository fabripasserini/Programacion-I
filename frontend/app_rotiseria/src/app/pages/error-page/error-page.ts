import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetUserInfo } from '../../services/getuserinfo';
import { Back } from '../../components/back/back';
@Component({
  selector: 'app-error-page',
  imports: [RouterLink,Back],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css'
})
export class ErrorPage {
  constructor(private userInfo: GetUserInfo) {}

  getBloqueado() {
    return this.userInfo.getBloqueado();
  }
}
