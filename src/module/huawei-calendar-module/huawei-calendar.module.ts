import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HuaweiCalendar } from "./huawei-calendar.component";

import { StatusBar } from '@ionic-native/status-bar';


const providers = [
  StatusBar,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
];

@NgModule({
  declarations: [HuaweiCalendar],
  imports: [
    IonicModule
  ],
  exports: [HuaweiCalendar],
  entryComponents: [HuaweiCalendar],
  providers: providers
})
export class HuaweiCalendarModule {}
