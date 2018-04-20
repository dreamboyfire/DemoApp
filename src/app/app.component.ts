import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { TabsPage } from '../pages/tabs/tabs';
import * as moment from "moment";
import io from 'socket.io-client';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              backgroundMode: BackgroundMode,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      // statusBar.hide();

      if (platform.is("android")) {
        backgroundMode.setDefaults({
          "title": "DemoApp",
          "text": "running",
          "silent": false
        });
      }

      backgroundMode.enable();
      statusBar.styleLightContent();

      this.initWebSocket();
    });
  }


  initWebSocket() {

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZmYzNmNTAtNTdiZS0xMWU3LWIyOTctMWRmMzc5MjE0NDVkIiwidXNlcm5hbWUiOiJmZW5namsiLCJpc0FkbWluIjpmYWxzZSwibGFzdExvZ2luVGltZSI6MTUyMjQ2NDAxNjAwMCwiaWF0IjoxNTIyNDY0MDE2LCJleHAiOjE1MjUwNTYwMTZ9.RaZiZQrzTH_PRs2WW-ObOdbGfze_aF2s4_V5jLN2LWA";
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjRmODRjN2EwLTMyZWQtMTFlOC1iMDY3LTQ3MjY1YzdhMmFhYyIsInVzZXJuYW1lIjoiZmVuZ2prIiwiaXNBZG1pbiI6ZmFsc2UsImxhc3RMb2dpblRpbWUiOjE1MjI0NzMyMDcwMDAsImlhdCI6MTUyMjQ3MzIwOCwiZXhwIjoxNTI1MDY1MjA4fQ.IcwmEhZOFiYWLmhszy-7S8iuFrrQ2AeV_LXUDW3WBSw";
    window["demo_socketio"] = io("http://58.248.27.170:8082/", {
      'query': 'token=' + token
    });
    // window["demo_socketio"] = io("http://192.168.8.100:9008/");

    console.log("initWebSocket", window["demo_socketio"]);

    window["demo_socketio"].on('connect', () => {
      console.info(moment().format("YYYY-MM-DD HH:mm:ss SSS"), '---connnect----');
    });

    window["demo_socketio"].on('push', (data) => {
      console.info('---push----', data);
      window.alert(JSON.stringify(data));
    });

    window["demo_socketio"].on('disconnect', () => {
      window["demo_socketio"].connect();
      console.info(moment().format("YYYY-MM-DD HH:mm:ss SSS"), '--disconnect--');
      /**
       * socket断开连接后马上
       */
      console.log(moment().format("YYYY-MM-DD HH:mm:ss SSS"), "--重新创建socket连接--");
      // window.alert(moment().format("YYYY-MM-DD HH:mm:ss SSS") + '---disconnect--')

    });

    window["demo_socketio"].on("error", (err) => {
      console.info(moment().format("YYYY-MM-DD HH:mm:ss SSS"), '---error--', err);
    });
  }
}
