import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Common} from "../../provider/common";
import * as _ from "lodash";

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  loading: any = null;

  @ViewChild("calendar")
  calendar: any;

  slideList = new Array(1000);

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private common: Common
  ) {
    _.forEach(this.slideList, (slide, i) => {
      this.slideList[i] = i + 1;
    });

    let lunar_json = window["calendar"].solar2lunar(2018,1,15);
    console.log("lunar_json>>>>>>>>>>>>>>", lunar_json);
  }

  ionViewDidEnter() {
    console.log("CalendarPage>>>>>>>>>>>", this.calendar);
    this.initDaySelected();

    this.calendar.onSelectDateChange.subscribe(date => {
      console.log("选中的日期已改变>>>>>>>>>>>>", date);
    });
  }

  initDaySelected() {
    _.forEach(this.calendar.dateArray, date => {
      date.isToday = false;
      date.isSelect = false;
      if (this.calendar.currentYear === date.year && this.calendar.currentMonth === date.month && date.date === 29) {
        date.isSelect = true;
      }

      if (this.calendar.currentYear === date.year && this.calendar.currentMonth === date.month && date.date === 20) {
        date.isSelect = true;
      }
    })
  }

  onDaySelect(event) {
    // console.log("onDaySelect>>>>>>>>>", event);
    this.initDaySelected();
    event.isToday = true;
    event.isSelect = false;
    return false;
  }

  onDayClick(event) {
    // console.log(event);
    return false;
  }

  onCreateMonth(month) {
    console.log("onCreateMonth>>>>>>>>>>>>>", month);
  }

}
