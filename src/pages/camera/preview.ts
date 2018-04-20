import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Common} from "../../provider/common";
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import * as _ from "lodash";

@Component({
  selector: 'page-camera-preview',
  templateUrl: 'preview.html'
})
export class CameraPreviewPage {

  base64Image = "";

  @ViewChild("ionIcon")
  ionIcon: any;

  screenWidth = null;
  screenHeight = null;
  topDistant = 0;

  showAnimate = false;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private common: Common,
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private zone: NgZone,
    private photoLibrary: PhotoLibrary
  ) {

    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height / 10 * 8;
    this.topDistant = window.screen.height - this.screenHeight;
  }

  ionViewDidEnter() {
    console.log(this.ionIcon);
    this.initCanvasAnimate();
  }

  start() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
        this.showAnimate = true;
      },
      (err) => {
        console.log(err)
      });

    this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.OFF);

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(window["cordova.plugins.KeyboardService"]);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    if (window["cordova.plugins.KeyboardService"]) {
      window["cordova.plugins.KeyboardService"].start();
      setInterval(() => {
        if (window["cordova.plugins.KeyboardService"].isVolume_Changed) {
          this.take();
        }
      }, 10);
    }
  }

  take() {
    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: window.screen.width,
      height: window.screen.height,
      quality: 100
    };

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.zone.run(() => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photoLibrary.saveImage(this.base64Image, "demo")
          .then(function (result) {
            // alert(JSON.stringify(result));
          })
          .catch(function (err) {
            // alert(JSON.stringify(err));
          })
      });
    }, (err) => {
      console.log(err);
      this.base64Image = 'assets/img/test.jpg';
    });
  }

  stop() {
    this.cameraPreview.stopCamera();

    this.showAnimate = false;
  }

  initCanvasAnimate() {
    var canvas = document.getElementById("canvas");

    canvas.style.position = "fixed";
    canvas.style.top = this.topDistant + "px";

    canvas.style.opacity = "0.2";

    var context = canvas["getContext"]("2d");
    var maxWidth = canvas["width"];
    var maxHeight = canvas["height"];
    var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
    // var colors = ["#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3", "#d3d3d3"];

    //随机数d3d3d3
    function random(min,max){
      return Math.floor(Math.random()*(max-min)+min)
    }

    //构造函数
    function Ball(){
      this.a=true;
      this.b=true;
      this.r=random(10,30);
      this.ballColor={color: colors[Math.floor(Math.random() * colors.length)]}
      this.vx=random(30,maxWidth-30);
      this.vy=random(30,maxHeight-30);
      this.ispeed=random(1,10);
      this.ispeed2=random(1,10);
    }

    // 面向对象
    Ball.prototype.moveBall=function(){
      context.beginPath();
      if (this.a) {
        this.vx += this.ispeed;
        if (this.vx>=maxWidth-this.r) {
          this.a = false;
        }

      } else {
        this.vx -= this.ispeed;
        if (this.vx <= this.r) {
          this.a = true;
        }
      }

      if (this.b) {
        this.vy+= this.ispeed2;
        if (this.vy >= maxHeight-this.r) {
          this.b = false;
        }

      } else {
        this.vy -= this.ispeed2;
        if (this.vy <= this.r) {
          this.b = true;
        }
      }

      context.fillStyle=this.ballColor.color;
      context.arc(this.vx,this.vy,this.r,0,Math.PI*2,false);
      context.fill();
    }

    var Aball=[];
    for(var i=0;i<100;i++){
      Aball[i]=new Ball();
    }

    setInterval(function(){
      context.clearRect(0,0,canvas["width"],canvas["height"])
      for(var i=0;i<100;i++){
        Aball[i].moveBall();
      }

    },30)

  }

}
