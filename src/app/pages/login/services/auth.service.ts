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

  public logout() {
    return this.afa.signOut();
  }


  async isLogged() {
    await this.afa.onAuthStateChanged(user => {
      return user;
    });
 }

 

  public register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //   } else {
  //     // No user is signed in.
  //   }
  // });


}
