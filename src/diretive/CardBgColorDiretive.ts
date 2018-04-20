import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import * as _ from "lodash";

/**
 * [index]:<ion-card>标签的背景色
 * Created by dreamboyfire on 2017/9/17.
 */
@Directive({selector: '[CardBgColor]'})
export class CardBgColorDirective {

  cardBgColor: string;

  _el: any;

  colorList = {
    "Angular": "#B52E31",
    "angular": "#B52E31"
  };

  constructor(el: ElementRef) {
    console.log(el);
    this._el = el;
  }

  ngAfterContentInit() {
    console.log(this._el);
    this._el.nativeElement.style.backgroundColor = this.colorList[this.cardBgColor];
  }

  @Input("CardBgColor")
  set setCardBgColor(value: string) {
    this.cardBgColor = value;
  }
}
