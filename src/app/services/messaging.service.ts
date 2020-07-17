import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private db : firebase.database.Database;
  constructor(private auth : AngularFireAuth)
  {
    this.db = firebase.database();
    this.db.goOnline();
  }

  sendMessage(chat_id : string, message)
  {
    let newMessageRef = this.db.refFromURL("https://telefonicachat.firebaseio.com/chats/0/mensajes").push();
    newMessageRef.set(message);
  }

  receiveMessages(chat_id : string) : firebase.database.Reference
  {
    return (this.db.refFromURL("https://telefonicachat.firebaseio.com/chats/0/mensajes"))
  }
}
