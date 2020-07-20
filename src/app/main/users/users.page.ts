import { UserService } from './../../services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"],
})
export class UsersPage implements OnInit {
  public users : {email: string, uid: string}[] = [];
  public userReceiver : firebase.database.Reference;
  constructor(private chatService : ChatService, private router : Router, private userService : UserService) {}

  async ngOnInit() {
    this.users = []
    this.userReceiver = await this.userService.suscribeUsers();
    this.userReceiver.on('value', (snap) => {
      if (snap && snap.val())
        this.users = Object.values(snap.val())
    });
  }

  async createChat(other: { email: string; uid: string }) {
    let chat = await this.chatService.createChat(other);
    this.router.navigateByUrl("/main/chat", {state: {infoChat: {chat: chat, other: other}}})
  }
}
