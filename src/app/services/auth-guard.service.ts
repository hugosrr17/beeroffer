import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private afa: AngularFireAuth, private storage: Storage) { }

  private status: boolean;



  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.afa.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['login']);
        this.status = false;
      } else {
        this.status = true;
        this.router.navigate(['home']);

      }
    });

    return this.status;
  }
}