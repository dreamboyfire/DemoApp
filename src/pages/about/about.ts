import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Common} from "../../provider/common";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  loading: any = null;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private common: Common
  ) {

  }

  checkUpdate() {
    console.log("<<<<<<<<<<tabs.ionViewDidEnter>>>>>>>>>>");
    this.loading = this.loadingCtrl.create({
      content: "正检查更新，请稍候..."
    });
    this.loading.present();
    let option = {
      'config-file': "http://123.207.244.73:3000/DemoApp/www/chcp.json",
      'request-headers': {}
    };

    if (window["chcp"]) {
      window['chcp'].fetchUpdate( (error, data) => {
        this.loading.dismiss();
        console.log("chcp.fetchUpdate>>>>>>>>", error, data);
        if (error) {
          if (error.code === 2) {
            this.common.showAlertMessage(null, "当前版本已是最新版本！", null)
          } else {
            this.common.confirmAlert(null, "检查更新出错！", [{
              text: '查看错误信息',
              role: 'cancel',
              handler: () => {
                this.common.showAlertMessage(null, JSON.stringify(error), null);
              }
            },
              {
                text: '确定',
                handler: () => {

                }
              }]);
          }
        } else {
          this.loading = this.loadingCtrl.create({
            content: "正安装更新，请稍候..."
          });
          this.loading.present();
          window['chcp'].installUpdate(installError => {
            this.loading.dismiss();
            if (installError) {
              this.common.confirmAlert(null, "安装更新文件失败！", [{
                text: '查看错误信息',
                role: 'cancel',
                handler: () => {
                  this.common.showAlertMessage(null, JSON.stringify(installError), null);
                }
              },
                {
                  text: '确定',
                  handler: () => {

                  }
                }]);
            } else {
              this.common.showAlertMessage(null, "更新成功！", null);
            }
          });
        }
      }, option);
    } else {
      this.common.showAlertMessage(null, "获取更新插件失败！", null);
      this.loading.dismiss();
    }
  }

}
