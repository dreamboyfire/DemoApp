import { Component } from '@angular/core';
import {LoadingController} from "ionic-angular";
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Common } from "../../provider/common";

@Component({
  templateUrl: 'tabs.html',
  providers: [Common]
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(
    private loadingCtrl: LoadingController,
    private common: Common
  ) {

  }

}
