import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import * as marked from "marked";

/**
 * 解析markdown格式的文本内容
 */
@Component({
  selector: 'page-marked',
  templateUrl: 'marked.html'
})
export class IonicMarkedPage {

  markedText = null;

  constructor(
    public navCtrl: NavController,
    private sanitizer: DomSanitizer
) {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    this.markedText = this.sanitizer.bypassSecurityTrustHtml(marked("# 我是六级标题的第一级\n"
      + "## 我是六级标题的第二级\n" + "### 我是六级标题的第三级\n" + "#### 我是六级标题的第四级\n"
      + "##### 我是六级标题的第五级\n" + "###### 我是六级标题的第六级\n"));
  }

}
