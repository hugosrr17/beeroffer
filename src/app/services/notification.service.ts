import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(public loadingController: LoadingController, public alertController: AlertController) { }


  public async presentLoading(show: boolean, msg?: string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
      duration: 2000
    });

    if (show) {
      await loading.present();
    } else {
      await loading.dismiss();
    }

  }

  public async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops...',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
