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
    this.users = await this.userService.getUsers();

    this.userReceiver = await this.userService.suscribeUsers();
    this.userReceiver.on('child_added', (snap) => this.users.push(snap.val()))
  }

  async createChat(other: { email: string; uid: string }) {
    let chat = await this.chatService.createChat(other);
    this.router.navigateByUrl("/main/chat", {state: {infoChat: {chat: chat, other: other}}})
  }
}
