import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router : Router) {
    auth.onAuthStateChanged((user) => {
      if (!user)
      {
        router.navigateByUrl("/home")
      } else {
        router.navigateByUrl("/main")
      }
  });
  }

  logIn(email : string, password : string)
  {
    return (this.auth.signInWithEmailAndPassword(email, password));
  }

  register(email : string, password : string)
  {
    return (this.auth.createUserWithEmailAndPassword(email, password));
  }

}
