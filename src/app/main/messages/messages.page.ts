import { ChatService } from "src/app/services/chat.service";
import { UserService } from "./../../services/user.service";
import { Router, NavigationExtras } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"],
})
export class MessagesPage implements OnInit {
  public chats = [];
  public chatsReceiver : firebase.database.Reference;
  public loading : boolean
  constructor(private router: Router,private userService: UserService,private chatService: ChatService) {
    this.loading = true;
  }

  async ngOnInit() {
    this.chatsReceiver = await this.userService.suscribeToChats();
    this.chatsReceiver.on('value',async (snap) => {
      if (snap != null && snap.val() != undefined)
        Object.values(snap.val()).forEach(async (e) => {this.chats.push(await this.userService.getChatFromUID(e))})
    });
  }

  goToChat(chat) {
    let navigationExtras: NavigationExtras = {
      state: {
        infoChat: chat,
      },
    };
    this.router.navigateByUrl("/main/chat", navigationExtras);
  }


}
