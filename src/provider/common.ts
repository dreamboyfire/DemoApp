/**
 * Created by s-guanhm on 2017/11/9.
 */
import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';

@Injectable()
export class Common {
  constructor(
    private alertCtrl: AlertController
  ) {

  }

  showAlertMessage(title, msg, buttons) {
    buttons = buttons ? buttons : [
      {
        text: "确定",
        role: 'cancel',
        handler: () => {
        }
      }
    ];
    title = title ? title : "信息提示";
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: buttons
    });
    alert.present();
  }

  confirmAlert(title, msg, buttons) {
    title = title ? title : "信息提示";
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: buttons
    });
    alert.present();
    return alert;
  }

}
