import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IonicSlidePage} from "../slide/slide";
import {IonicListPage} from "../list/list";
import {IonicMarkedPage} from "../../marked/marked";

@Component({
  selector: 'page-ionic-main',
  templateUrl: 'main.html'
})
export class IonicMainPage {

  constructor(public navCtrl: NavController) {

  }

  goPage(page) {
    switch (page) {
      case "list":
        this.navCtrl.push(IonicListPage);
        break;
      case "slide":
        this.navCtrl.push(IonicSlidePage);
        break;
    }
  }
}
