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
  public messages = [
    {
      sender: "fhwhieohifwe",
      content: "Hola qué tal todo bitch",
      hour: "17:53"
    },
    {
      sender: "jrfieijofjoi",
      content: "Hola qué tal todo bitch",
      hour: "17:53"
    },
    {
      sender: "fhwhieohifwe",
      content: "Hola qué tal todo bitch",
      hour: "17:53"
    },
  ];
  constructor(private router : Router, private route : ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.chat = this.router.getCurrentNavigation().extras.state.chat;
        
      }
    });
  }

  ngOnInit()
  {
  }

}
