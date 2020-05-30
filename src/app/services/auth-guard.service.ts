import { AuthService } from './../pages/login/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {


    console.log(this.auth.isLogged());

    // async login() {
    //   try {
    //     const r = await this.auth.login(this.userLogin);
    //     if (r) {
    //       this.storage.set('user', r);
    //     }
    //   } catch (err) {
    //     this.presentAlert(this.mapError(err.code));

    //   }
    // }

    // if (this.auth.isLogged() == null) {
    //   this.router.navigate(['login']);
    //   console.log('null')
    //   return false;
    // }

    return true;
  }
}