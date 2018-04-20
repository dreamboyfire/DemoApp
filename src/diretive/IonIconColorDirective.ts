import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import * as _ from "lodash";

/**
 * [index]:<ion-card>标签的背景色
 * Created by dreamboyfire on 2017/9/17.
 */
@Directive({selector: '[IonIonicColor]'})
export class IonIonicColorDirective {

  _el: any;

  colorList = {
    "logo-angular": "#B52E31",
    "ionic": "#3380FF",
    "bookmark": "#FFD700"
  };

  constructor(el: ElementRef) {
    console.log(el);
    this._el = el;
  }

  ngAfterContentInit() {
    console.log(this._el);
    let name_attr = _.find(this._el["nativeElement"]["attributes"], {name: "name"});
    if (name_attr) {
      let color = this.colorList[name_attr["nodeValue"]];
      if (color) {
        this._el.nativeElement.style.color = color;
      }
    }
  }

}
