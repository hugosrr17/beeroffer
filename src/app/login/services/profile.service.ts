import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private PATH = 'profile/';


  constructor(public db: AngularFireDatabase) {


  }

  push(profile: Profile) {
    this.db.list(this.PATH).push(profile);
  }
}
