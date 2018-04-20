import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Common} from "../../provider/common";
import {CalendarPage} from "../calendar/calendar";
import {IonicListPage} from "../ionic/list/list";
import {IonicMainPage} from "../ionic/main/main";
import {IonicMarkedPage} from "../marked/marked";
import {CKEditorPage} from "../ckeditor/ckeditor";
import {FingerprintPage} from "../fingerprint/fingerprint";
import {MomentPage} from "../moment/moment";
import {Http, RequestOptions, Headers, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map'
import {CameraPage} from "../camera/camera";
import io from 'socket.io-client';
import * as moment from "moment";
import * as request from "request";
import {CameraPreviewPage} from "../camera/preview";

declare var FingerprintAuth: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  socketio: any = {};

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private common: Common,
              public http: Http) {

  }

  goPage(type) {
    switch (type) {
      case "calendar":
        this.navCtrl.push(CalendarPage);
        break;
      case "ionic":
        this.navCtrl.push(IonicMainPage);
        break;
      case "marked":
        this.navCtrl.push(IonicMarkedPage);
        break;
      case "ckeditor":
        this.navCtrl.push(CKEditorPage);
        break;
      case "fingerprint":
        this.navCtrl.push(FingerprintPage);
        break;
      case "moment":
        this.navCtrl.push(MomentPage);
        break;
      case "camera":
        this.navCtrl.push(CameraPage);
        break;
      case "camera-preview":
        this.navCtrl.push(CameraPreviewPage);
        break;
    }
  }

  downloadFile() {
    // let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
    let options = new RequestOptions(
      {
        // headers: headers,
        responseType: 3
      });
    var link = document.createElement("a");
    // this.http.get("http://10.88.134.144:3018/api/v1/common/irmattach/?type=share&platform=web&path=研究小组组会纪要/周期小组组会会议纪要/周期组-组会汇报-20171024.docx&uid=3d454e3840549dd8", options)
    this.http.get("http://10.88.115.57/api/v1/common/irmattach/?type=share&platform=web&path=%E7%A0%94%E7%A9%B6%E5%B0%8F%E7%BB%84%E7%BB%84%E4%BC%9A%E7%BA%AA%E8%A6%81/%E7%94%B0%E6%96%87%E8%88%9F-%E6%B5%8B%E8%AF%95001%E6%B5%8B%E8%AF%9520180122.txt&uid=3d454e3840549dd8", options)
    .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        link.setAttribute("href", window.URL.createObjectURL(data));//window.URL.createObjectURL(new Blob([data["blob"]], {type: data["mime"]}))
        link.setAttribute("download", "test.docx");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  disconnectSocket() {

  }
}
