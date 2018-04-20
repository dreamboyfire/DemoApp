import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from "moment";

@Component({
  selector: 'page-moment',
  templateUrl: 'moment.html'
})
export class MomentPage {

  code = "";
  result = "";

  constructor(public navCtrl: NavController) {

  }

  runCode() {
    this.result = "" + moment("2017-12-31").weekday();
    console.log(moment("2017-12-31").weekday());
  }

}
