import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public chat = null;
  public message = "";
  public messages = [];
  constructor(private router : Router, private route : ActivatedRoute, private auth : AngularFireAuth) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.chat = this.router.getCurrentNavigation().extras.state.chat;
        
      }
    });
  }

  ngOnInit()
  {
  }

  async sendMessage()
  {
    let date = new Date();
    let hour = date.getUTCHours() + ":" + date.getUTCMinutes();
    
  }
}
