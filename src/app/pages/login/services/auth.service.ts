import { ProfileService } from './profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private afa: AngularFireAuth, private router: Router, private profile: ProfileService) {

  }


  public login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  public logout() {
    return this.afa.signOut();
  }


  public register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  public isLogged() {
    // 
    this.afa.onAuthStateChanged(user => {
      if (user) {
        const getProfile = this.profile.getProfile(user.uid).subscribe(event => this.router.navigate(['home']));
      }
    });
  }



}
