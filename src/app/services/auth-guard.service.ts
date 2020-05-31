import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private afa: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.afa.onAuthStateChanged(user => {
      if (!user) {
        console.log('teste');
        this.router.navigate(['login']);
        return false;
      }
    });

    return true;
  }
}