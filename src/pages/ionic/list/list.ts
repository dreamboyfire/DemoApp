import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ionic-list',
  templateUrl: 'list.html'
})
export class IonicListPage {

  constructor(public navCtrl: NavController) {

  }

  doInfinite(event) {
    console.log(event);
  }
}
