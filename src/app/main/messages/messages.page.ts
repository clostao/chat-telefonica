import { Router, NavigationExtras } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"],
})
export class MessagesPage implements OnInit {
  public chats = [
    {
      chat_id: "fhwhieohifwejrfieijofjoi",
      member1: "fhwhieohifwe",
      member2: "jrfieijofjoi",
      other: {
        uid: "jrfieijofjoi",
        email: "hastro1990@gmail.com",
      },
      lastMessage: {
        content: "Hola tío",
        date: "17:56",
      },
    },
  ];

  constructor(private auth: AngularFireAuth, private router: Router)
  {

  }

  async ngOnInit() {}

  goToChat(chat) {
    let navigationExtras: NavigationExtras = {
      state: {
        chat: chat,
      },
    };
    this.router.navigateByUrl("/main/chat", navigationExtras);
  }
}
