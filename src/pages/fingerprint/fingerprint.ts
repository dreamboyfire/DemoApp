import {Component, ViewChild, NgZone} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Common} from "../../provider/common";
import * as _ from "lodash";
import * as Fingerprint from "fingerprintjs2";
declare var FingerprintAuth: any;

@Component({
  selector: 'page-fingerprint',
  templateUrl: 'fingerprint.html'
})
export class FingerprintPage {

  fingerprintAuthResult = "";
  encryptResult = {};
  decryptConfigString = "";

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private zone: NgZone,
              private common: Common) {

  }

  ionViewDidEnter() {



  }

  FingerprintEncrypt() {
    var encryptConfig = {
      clientId: "DemoApp",
      username: "test",
      password: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ0NDU5NjUwLWQ4YjktMTFlNy04NDVhLTVmZjVhNWVmODc1MiIsInVzZXJuYW1lIjoiZmVuZ2prIiwiaWF0IjoxNTE2ODU5MTI3LCJleHAiOjE1MTk0NTExMjd9.TJQhtrrv_rlJ3EDiRMHStoR0AXzGfUOI0TRfmFEH7Wc",
      locale: "zh_CN"
    };

    this.decryptConfigString = JSON.stringify(encryptConfig);

    FingerprintAuth.encrypt(encryptConfig, result => {
      this.encryptResult = result;

      this.zone.run(() => {
        this.fingerprintAuthResult = JSON.stringify(result);
      });

      console.log("successCallback(): " + JSON.stringify(result));
      if (result.withFingerprint) {
        console.log("Successfully encrypted credentials.");
        console.log("Encrypted credentials: " + result.token);
      } else if (result.withBackup) {
        console.log("Authenticated with backup password");
      }
    }, error => {
      if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
        console.log("FingerprintAuth Dialog Cancelled!");
      } else {
        console.log("FingerprintAuth Error: " + error);
      }
    });
  }

  FingerprintDecrypt() {
    var decryptConfig = {
      clientId: "DemoApp",
      username: "test",
      locale: "zh_CN",
      token: this.encryptResult["token"]
    };

    this.decryptConfigString = JSON.stringify(decryptConfig);

    FingerprintAuth.decrypt(decryptConfig, result => {

      this.zone.run(() => {
        this.fingerprintAuthResult = JSON.stringify(result);
      });

      console.log("successCallback(): " + JSON.stringify(result));
      if (result.withFingerprint) {
        console.log("Successful biometric authentication.");
        if (result.password) {
          console.log("Successfully decrypted credential token.");
          console.log("password: " + result.password);
        }
      } else if (result.withBackup) {
        console.log("Authenticated with backup password");
      }
    }, error => {
      if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
        console.log("FingerprintAuth Dialog Cancelled!");
      } else {
        console.log("FingerprintAuth Error: " + error);
      }
    });

  }

  FingerprintIsAvailable() {
    FingerprintAuth.isAvailable(result => {


      this.zone.run(() => {
        this.fingerprintAuthResult = JSON.stringify(result);
      });
    }, error => {

    });
  }

}
