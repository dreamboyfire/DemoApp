import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ionic-slide',
  templateUrl: 'slide.html'
})
export class IonicSlidePage {

  constructor(public navCtrl: NavController) {

  }

  doInfinite(event) {
    console.log(event);
  }
}
