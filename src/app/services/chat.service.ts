import { UserService } from "./user.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private uid: string;
  private db: firebase.database.Database;
  userService: UserService;
  constructor(private auth: AngularFireAuth, userService: UserService) {
    this.db = firebase.database();
    this.userService = userService;
  }
  
  private getChatId(uid1: string, uid2: string) {
    return uid1.localeCompare(uid2) > 0 ? uid1.concat(uid2) : uid2.concat(uid1);
  }
  
  async createChat(other: { email: string; uid: string }) {
    let myUid = (await this.auth.currentUser).uid;
    let chat = {
      members: [myUid, other.uid],
      id: this.getChatId(myUid, other.uid),
      messages: [],
    };
    await this.db.ref("/chats").child(chat.id).set(chat);
    await this.db.ref("users").child(myUid).child("open_chats").push(other.uid)
    await this.db.ref("users").child(other.uid).child("open_chats").push(myUid)
    return (chat);
  }
  
  suscribeMessages(chatId: string) {
    return this.db.ref("chats").child(chatId).child("messages");
  }
  
  async sendMessage(message: string, id: string) {
    
    let myUid = (await this.auth.currentUser).uid;
    this.db.ref("/chats").child(id).child("messages").push({
      sender: myUid,
      content: message,
      timestamp: new Date().getTime()
    });
  }
  async getMessages(chatID: string) {
    let messages;
    await this.db.ref("/chats").child(chatID).child("messages").orderByChild("timestamp").once('value', (snap) => {
      messages = snap.val()
    });
    return ((messages) ? Object.values(messages) : [])
  }
}
