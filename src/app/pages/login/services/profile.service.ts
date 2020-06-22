import { Profile } from './../interfaces/profile';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // private profileRef = this.firestore.collection('profile');
  private profile: AngularFirestoreCollection<Profile>;

  constructor(public firestore: AngularFirestore) {

  }

  pushProfile(profile: Profile, id: string) {
    this.firestore.doc(`profile/${id}`).set(profile);
  }


  getProfile(id: string): Observable<any[]> {
    const profile = this.firestore.collection<any>('profile', ref => {
      return ref.where('uid', '==', `${id}`);
    });

    return profile.valueChanges();
  }

}