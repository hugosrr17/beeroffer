import { Profile } from './interfaces/profile';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



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


  private loading = this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private auth: AuthService,
    private profileService: ProfileService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage) { }
  ngOnInit() {
  }


  async login() {
    try {
      const r = await this.auth.login(this.userLogin);
      if (r) {
        this.storage.set('user', r);
      }
    } catch (err) {
      this.presentAlert(this.mapError(err.code));

    }
  }

  async register() {
    try {
      const r = await this.auth.register(this.userRegister);
      if (r) {
        this.userProfile.uid = r.user.uid;
        try {
          const p = await this.profileService.push(this.userProfile);
        } catch (err) {
          this.presentAlert(this.mapError(err.code));
        }
      }
    } catch (err) {
      console.log(err);
      this.presentAlert(this.mapError(err.code));
    }
  }



  validation() {
    if (!!this.userProfile.name &&
      !!this.userProfile.city &&
      this.validateEmail(this.userRegister.email) &&
      !!this.userRegister.password &&
      this.verifyPassword()
    ) {
      return false;
    } else {
      return true;
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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



  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops...',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  mapError(error) {
    const mapCodes = {
      'auth/email-already-in-use': 'Você já está cadastrado no Beer Offer!',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
      'auth/wrong-password': 'A senha é inválida ou o usuário não está cadastrado.'
    };
    if (mapCodes[error]) {
      return mapCodes[error];
    }
    else {
      return error;
    }

  }
}
