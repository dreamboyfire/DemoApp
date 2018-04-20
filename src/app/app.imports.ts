import {MyApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {CardBgColorDirective} from "../diretive/CardBgColorDiretive";
import _ from "lodash";
import {IonIonicColorDirective} from "../diretive/IonIconColorDirective";
import {CameraPage} from "../pages/camera/camera";

/**
 * Created by dreamboyfire on 2017/9/17.
 */
let component_declarations = [
  MyApp,
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  CameraPage
];
let directive_declarations = [CardBgColorDirective, IonIonicColorDirective];

// TabsModule
let _TabsLinker = [
  {
    component: TabsPage, name: 'TabsPage', segment: 'tab'
  }
];
// HomeModule
let _HomeLinker = [
  {
    component: HomePage, name: 'HomePage', segment: 'home'
  }
];
// AboutModule
let _AboutLinker = [
  {
    component: AboutPage, name: 'AboutPage', segment: 'about'
  }
];
// ContactModule
let _ContactLinker = [
  {
    component: ContactPage, name: 'ContactPage', segment: 'contact'
  }
];

// ContactModule
let _CameraLinker = [
  {
    component: ContactPage, name: 'ContactPage', segment: 'contact'
  }
];

export const declarations = _.concat(component_declarations, directive_declarations);
export const entryComponent = component_declarations;
export const linker = _.concat(_TabsLinker, _HomeLinker, _AboutLinker, _ContactLinker);
