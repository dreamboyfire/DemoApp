import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Common} from "../../provider/common";
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  base64Image = "";

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private common: Common,
    private camera: Camera
  ) {

  }

  getPicture() {

    const popoverOptions: CameraPopoverOptions = {
      x: 10,
      y: 10,
      width: 0,
      height: 0,
      arrowDir: 2
    };

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 50,
      targetHeight: 50,
      saveToPhotoAlbum: true,
      popoverOptions: popoverOptions
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      setTimeout(() => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, 1000);
    }, (err) => {
      alert(err);
      // Handle error
    });
  }

}
