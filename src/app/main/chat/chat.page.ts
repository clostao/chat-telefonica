import { ChatService } from "./../../services/chat.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {

  public infoChat = null;

  public message = "";

  private messageReceiver: firebase.database.Reference;
  public savedMessages = [];
  constructor( private router: Router, private route: ActivatedRoute, private chatService: ChatService ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state)
        this.infoChat = this.router.getCurrentNavigation().extras.state.infoChat;
        this.infoChat.chat.messages = []
    });
    this.messageReceiver = this.chatService.suscribeMessages(this.infoChat.chat.id);
    this.messageReceiver.on("value", (snap) => {
      this.savedMessages = Object.values(snap.val())
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.infoChat.chat.id);
    this.message = "";
  }
}
