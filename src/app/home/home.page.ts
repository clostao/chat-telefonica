import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected email = "";
  protected password = "";
  public errorMessage = "";

  constructor(private authService : AuthService, private router : Router) {}

  logIn()
  {
    this.authService.logIn(this.email, this.password).then(() => this.router.navigateByUrl("/main/messages")).catch((error) => this.errorMessage = error.message);
  }

}
