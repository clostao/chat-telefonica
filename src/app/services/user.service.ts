import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private db: firebase.database.Database;
  
  constructor(private auth: AngularFireAuth) {
    this.db = firebase.database();
    this.db.goOnline();
  }
  
  private getChatId(uid1: string, uid2: string) {
    return uid1.localeCompare(uid2) > 0 ? uid1.concat(uid2) : uid2.concat(uid1);
  }

  async addUserToDB() {
    let user = await this.auth.currentUser;
    let reference = this.db.ref("users").child(user.uid);
    await reference.set({
      uid: user.uid,
      email: user.email,
      open_chats: [],
      pending_chats: [],
    });
  }
  
  async getEmailFromUID(uid) {
    let email;
    await this.db
    .refFromURL("https://telefonicachat.firebaseio.com/users")
    .child(uid)
    .once("value", (snap) => (email = snap.val().email));
    return (email);
  }
  
  async suscribeToChats() {
    return this.db
    .ref("/users/")
    .child((await this.auth.currentUser).uid)
    .child("open_chats");
  }
  
  async getUsers() : Promise<{uid: string, email : string}[]>{
    let value;
    await this.db.ref("users").once("value", (snap) => {
      value = snap.val()
    });
    return (Object.values(value));
  }
  
  suscribeUsers() {
    return (this.db.ref("users"));
  }
  
  async getChats()
  {
    let myUid = (await this.auth.currentUser).uid;

    let result = [];
    this.db.ref("users").child(myUid).child("open_chats").once('value', (snap) => {
      if (snap != null && snap.val() != undefined)
        Object.values(snap.val()).forEach(async (e : string) => result.push(await this.getChatFromUID(e, myUid)));
    });
    return (result)
  }

  async getChatFromUID(otherUID, myUID ?: string)
  {
    let result;
    if (myUID == undefined)
      myUID = (await this.auth.currentUser).uid
    await this.db.ref("chats").child(this.getChatId(otherUID, myUID)).once('value', snap => {
      result = snap.val()
    });
    return ({chat: result, other: {
      uid: otherUID,
      email: await this.getEmailFromUID(otherUID)
    }});
  }

}
