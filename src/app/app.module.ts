import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {IonIonicColorDirective} from "../diretive/IonIconColorDirective";
import {CardBgColorDirective} from "../diretive/CardBgColorDiretive";
import {CalendarPage} from "../pages/calendar/calendar";
import {Common} from "../provider/common";
import {LoginPage} from "../pages/login/login";
import {IonicListPage} from "../pages/ionic/list/list";
import {IonicSlidePage} from "../pages/ionic/slide/slide";
import {IonicMainPage} from "../pages/ionic/main/main";
import {IonicMarkedPage} from "../pages/marked/marked";
import {CKEditorPage} from "../pages/ckeditor/ckeditor";
import {HuaweiCalendarModule} from "../module/huawei-calendar-module/huawei-calendar.module";
import {FingerprintPage} from "../pages/fingerprint/fingerprint";
import {MomentPage} from "../pages/moment/moment";
import {Http} from '@angular/http';
import { HttpModule } from '@angular/http';
import {CameraPage} from "../pages/camera/camera";
import { Camera } from '@ionic-native/camera';
import {CameraPreviewPage} from "../pages/camera/preview";
import { CameraPreview } from '@ionic-native/camera-preview';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { BackgroundMode } from '@ionic-native/background-mode';

const declarations = [
  MyApp,
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  CalendarPage,
  LoginPage,
  IonicListPage,
  IonicSlidePage,
  IonicMainPage,
  IonicMarkedPage,
  CKEditorPage,
  FingerprintPage,
  MomentPage,
  CameraPage,
  CameraPreviewPage,

  CardBgColorDirective,
  IonIonicColorDirective
];

const links = [
  {
    component: TabsPage, name: 'TabsPage', segment: 'tabs'
  },
  {
    component: HomePage, name: 'HomePage', segment: 'home'
  },
  {
    component: AboutPage, name: 'AboutPage', segment: 'about'
  },
  {
    component: ContactPage, name: 'ContactPage', segment: 'contact'
  },
  {
    component: CalendarPage, name: 'CalendarPage', segment: 'calendar'
  },
  {
    component: LoginPage, name: 'LoginPage', segment: 'login'
  },
  {
    component: IonicListPage, name: 'IonicListPage', segment: 'ionic/list'
  },
  {
    component: IonicSlidePage, name: 'IonicSlidePage', segment: 'ionic/slide'
  },
  {
    component: IonicMainPage, name: 'IonicMainPage', segment: 'ionic/main'
  },
  {
    component: IonicMarkedPage, name: 'IonicMarkedPage', segment: 'marked'
  },
  {
    component: CKEditorPage, name: 'CKEditorPage', segment: 'ckeditor'
  },
  {
    component: FingerprintPage, name: 'FingerprintPage', segment: 'fingerprint'
  },
  {
    component: MomentPage, name: 'MomentPage', segment: 'moment'
  },
  {
    component: CameraPage, name: 'CameraPage', segment: 'camera'
  },
  {
    component: CameraPreviewPage, name: 'CameraPreviewPage', segment: 'camera/preview'
  }
];

const entryComponents = [
  MyApp,
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  CalendarPage,
  LoginPage,
  IonicListPage,
  IonicSlidePage,
  IonicMainPage,
  IonicMarkedPage,
  CKEditorPage,
  FingerprintPage,
  MomentPage,
  CameraPage,
  CameraPreviewPage
];

const providers = [
  StatusBar,
  SplashScreen,
  Common,
  Camera,
  CameraPreview,
  PhotoLibrary,
  BackgroundMode,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
];

@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: "md",
      iconMode: 'md',
      tabsHideOnSubPages: true
    }, {
      links: links
    }),
    HuaweiCalendarModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents,
  providers: providers
})
export class AppModule {}
