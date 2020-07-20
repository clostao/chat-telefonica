import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  logOut()
  {
    this.authService.logOut();
  }

}
