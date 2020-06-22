import { Profile } from './interfaces/profile';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MapMenssageFirebaseService } from 'src/app/services/map-menssage-firebase.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  public userRegister: User = {};
  public userProfile: Profile = {};
  public verifyPasswordRegister: string;
  public messageErrorRegister: string;
  public wavesPosition = 0;
  private wavesDifference = 100;




  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private auth: AuthService,
              private profileService: ProfileService,
              private storage: Storage,
              private notification: NotificationService
  ) { }

  ngOnInit() {
    this.auth.isLogged();
  }


  async login() {
    this.notification.presentLoading(true, 'Estamos realizando a sua autenticação!');
    try {
      const r = await this.auth.login(this.userLogin);
      if (r) {
        const p = await this.profileService.getProfile(r.user.uid).subscribe(event => this.storage.set('user', event));
      }
    } catch (err) {
      this.notification.presentLoading(false);
      this.notification.presentAlert(MapMenssageFirebaseService.mapError(err.code));
    }
  }


  validationLogin() {
    if (
      !!this.validateEmail(this.userLogin.email) &&
      !!this.userLogin.password
    ) {
      return false;
    } else {
      return true;
    }
  }

  validationFormRegister() {
    if (
      !!this.userProfile.name &&
      !!this.userProfile.city &&
      !!this.userRegister.password &&
      this.validateEmail(this.userRegister.email) &&
      this.verifyPassword()
    ) {
      return false;
    } else {
      return true;
    }
  }


  async register() {
    this.notification.presentLoading(true, 'Bem vindo(a) ao BeerOffer! Bora economizar na "cerva"!');
    try {
      const r = await this.auth.register(this.userRegister);
      if (r) {
        this.userProfile.uid = r.user.uid;
        const pushProfile = await this.profileService.pushProfile(this.userProfile, this.userProfile.uid);
        const getProfile = await this.profileService.getProfile(r.user.uid).subscribe(event => this.storage.set('user', event));
        if (getProfile) {
          this.auth.isLogged();
        }
      }
    } catch (err) {
      this.notification.presentAlert(MapMenssageFirebaseService.mapError(MapMenssageFirebaseService.mapError(err.code)));
    }
  }

  
  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.messageErrorRegister = null;
      return (true);
    } else {
      this.messageErrorRegister = 'O seu email está incorreto!';
      return (false);
    }
  }




  verifyPassword() {
    if (this.userRegister.password === this.verifyPasswordRegister) {
      this.messageErrorRegister = null;
      return true;
    } else {
      this.messageErrorRegister = 'As senhas não são iguais!';
      return false;
    }
  }


  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  swipeNext() {
    this.slides.slideNext();
  }



  validateName(name) {
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
      this.messageErrorRegister = 'Por favor preencha um nome valido!';
      return false;
    } else {
      return true;
    }
  }


}
