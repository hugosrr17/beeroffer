import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  public login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }


  public register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password)
  }

  public statusUser() {
    return this.afa.onAuthStateChanged(firebaseUser => {
      console.log(firebaseUser);
    });
  }
}
