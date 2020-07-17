import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public chat = null;
  public message = "";
  private messageReceiver : firebase.database.Reference;
  public messages = [];
  constructor(private router : Router, private route : ActivatedRoute, private messagingService : MessagingService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.chat = this.router.getCurrentNavigation().extras.state.chat;
        
      }
    });
  }

  ngOnInit()
  {
    this.messageReceiver = this.messagingService.receiveMessages(this.chat.chat_id);
    this.messageReceiver.orderByChild("timestamp").once('value', (snap) => {
      this.messages = Object.values(snap.val())
    });
    this.messageReceiver.orderByChild("timestamp").on('child_added', snapshot => {
        this.messages.push(snapshot.val());
    });
  }

  async sendMessage()
  {
    this.messagingService.sendMessage("0",
      {
      content: this.message,
      sender: "this.chat.me",
      timestamp: new Date().getTime()
    });
    this.message = "";
  }

  getTime(date : Date)
  {
    return (date.getHours() + ":" + date.getMinutes());
  }
}
