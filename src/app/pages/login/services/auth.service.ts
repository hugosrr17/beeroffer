import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userClaims: any;
  constructor(private afa: AngularFireAuth) { }

  public login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  public logout() {
    return this.afa.signOut();
  }


  public register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }




}
