import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  async presentAlert(
    alertController: AlertController,
    title: string,
    msg: string,
    btn: { ok: string; cancel: string },
    okAction: () => void,
    cancelAction?: () => void
  ) {

    btn=btn || { ok: 'Yes', cancel: 'No' };

    const alert = await alertController.create({
      backdropDismiss:true,
      header: title,
      message: msg,
      buttons: [
        {
          text: btn.cancel,
          role: 'cancel',
          handler: () => {
            cancelAction();
          },
        },
        {
          text: btn.ok,
          role: 'confirm',
          handler: () => {
            okAction();
          },
        },
      ],
    });

    await alert.present();
  }
}
