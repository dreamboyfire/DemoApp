import {Component, Input, ViewChild, ChangeDetectorRef, NgZone, Output, EventEmitter} from '@angular/core';
import {Platform} from 'ionic-angular';
import * as _ from "lodash";
import * as moment from "moment";

let $ = window["$"];

@Component({
  selector: "huawei-calendar",
  templateUrl: 'huawei-calendar.html'
})
export class HuaweiCalendar {

  currentDate = moment();
  selectDate: any = moment();
  currentMonth = moment();
  currentWeek = 0;

  @Input("weekHeader") private weekHeader: any;
  @Input("autoHeight") private autoHeight: any;
  @Input("monthFormat") private monthFormat: string;
  @Input("dateFormat") private dateFormat: string;
  @ViewChild("calendarSlides") calendarSlides: any;
  @ViewChild("weekSlides") weekSlides: any;

  @Output("onMonthChange") onMonthChange: EventEmitter<any> = new EventEmitter();
  @Output("onWeekChange") onWeekChange: EventEmitter<any> = new EventEmitter();
  @Output("onCreateMonth") onCreateMonth: EventEmitter<any> = new EventEmitter();
  @Output("onCreateWeek") onCreateWeek: EventEmitter<any> = new EventEmitter();
  @Output("onShowByWeek") onShowByWeek: EventEmitter<any> = new EventEmitter();
  @Output("onSelectDateChange") onSelectDateChange: EventEmitter<any> = new EventEmitter();

  _weekHeader = ["日", "一", "二", "三", "四", "五", "六"];//头部星期显示
  _monthFormat = "YYYY-MM";//月份格式
  _dateFormat = "YYYY-MM-DD";//日期格式

  _touchDirection = "";

  initialSlide = 0;

  monthSlideActiveIndex = 2;
  weekSlideActiveIndex = 2;

  pageIndex = 1;
  showCalendarRow = -1;
  _targetRowOffsetTop = -1;

  isShowByWeek = false;
  isFirstShowWeek = true;

  isInit = true;

  calendarData = [];
  weekData = [];

  constructor(platform: Platform,
              private zone: NgZone,
              private cd: ChangeDetectorRef) {

    this.initDays(moment(), null, false);
    this.initWeeks(moment(), null, false);
    this.initialSlide = 6;
    this.monthSlideActiveIndex = 6;
    this.weekSlideActiveIndex = 6;

    for(let i = 1; i <= 6; ++i) {
      let newMonth = moment().add(i, "month");
      let newWeek = moment().add(i, "week");
      this.initDays(newMonth, "next", false);
      this.initWeeks(newWeek, "next", false);
    }

    for(let i = 1; i <= 6; ++i) {
      let newMonth = moment().subtract(i, "month");
      let newWeek = moment().subtract(i, "week");
      this.initDays(newMonth, "prev", false);
      this.initWeeks(newWeek, "prev", false);
    }
  }

  ngAfterViewInit() {

    /**
     * 初始化配置
     * @type {string[]}
     * @private
     */
    this._weekHeader = this.weekHeader ? this.weekHeader : this._weekHeader;
    this._monthFormat = this.monthFormat ? this.monthFormat : this._monthFormat;
    this._dateFormat = this.dateFormat ? this.dateFormat : this._dateFormat;

    this.calendarSlides.runCallbacksOnInit = false;//初始化是否执行回调
    this.weekSlides.runCallbacksOnInit = false;//初始化是否执行回调
    this.calendarSlides.freeMode = false;

    this.initCalendarSlide();

    this.initWeekSlide();

    this.initHammerSwipe();
    /*



    this.calendarSlides.autoHeight = this.autoHeight ? this.autoHeight : true;
    console.log("calendarSlides>>>>>>>>>>>>>>>", this.calendarSlides);

    this.initStyle();

    this.initTouchEvent();

    */
  }

  initCalendarSlide() {

    this.calendarSlides.ionSlideDidChange.subscribe($event => {
      this.calendarSlidesChange($event.swipeDirection);

      switch ($event.swipeDirection) {
        case "prev":

          this.onMonthChange.emit({
            swipeDirection: $event.swipeDirection,
            toMonth: this.calendarData[this.calendarSlides.getActiveIndex()].date
          });

          this.monthSlideActiveIndex = this.calendarSlides.getActiveIndex();

          if (this.calendarSlides.getActiveIndex() === 2) {
            this.monthSlideActiveIndex = this.calendarSlides.getPreviousIndex();
            this.calendarSlides.slideNext(0, false);
          }

          this.currentMonth = this.calendarData[this.monthSlideActiveIndex].date;

          console.log("ionSlidePrevStart>>>>>>>>>>>>>>prev>>>>>",
            this.calendarSlides.getActiveIndex(),
            moment().format("YYYY-MM-DD HH:mm:ss:SSS"));

          _.forEach(this.calendarData[this.calendarSlides.getActiveIndex()].weeks, week => {
            let day = _.find(week, data => {
              return data.date.format(this._dateFormat) === moment(this.selectDate).subtract(1, "month").format(this._dateFormat);
            });

            if (day) {
              this.selectDate = day.date;
              console.log("this.selectDate>>>>>>>>prev", this.selectDate.format(this._dateFormat));
              this.onSelectDateChange.emit(this.selectDate);
              this.setSelectedDay(day);
            }
          });
          break;
        case "next":

          this.onMonthChange.emit({
            swipeDirection: $event.swipeDirection,
            toMonth: this.calendarData[this.calendarSlides.getActiveIndex()].date
          });

          this.monthSlideActiveIndex = this.calendarSlides.getActiveIndex();

          this.currentMonth = this.calendarData[this.monthSlideActiveIndex].date;

          console.log("ionSlideNextStart>>>>>>>>>>>>>>next>>>>>>",
            this.calendarSlides.getActiveIndex(),
            moment().format("YYYY-MM-DD HH:mm:ss:SSS"));

          let nextSelectDate = moment(this.selectDate).add(1, "month");
          _.forEach(this.calendarData[this.calendarSlides.getActiveIndex()].weeks, week => {
            let day = _.find(week, data => {
              return data.date.format(this._dateFormat) === nextSelectDate.format(this._dateFormat);
            });

            if (day) {
              this.selectDate = day.date;
              console.log("this.selectDate>>>>>>>>next", this.selectDate.format(this._dateFormat));
              this.onSelectDateChange.emit(this.selectDate);
              this.setSelectedDay(day);
            }
          });
          break;
      }

      setTimeout(() => {
        this.calendarSlides.lockSwipeToPrev(false);
        this.calendarSlides.lockSwipeToNext(false);
      }, 500);

    });

    /**
     * slides向右滑动结束后
     */
    this.calendarSlides.ionSlideNextStart.subscribe($event => {
      this.calendarSlides.lockSwipeToNext(true);
    });

    /**
     * slides向左滑动结束后
     */
    this.calendarSlides.ionSlidePrevStart.subscribe($event => {
      this.calendarSlides.lockSwipeToPrev(true);
    });
  }

  initWeekSlide() {
    this.weekSlides.ionSlideDidChange.subscribe($event => {
      this.weekSlidesChange($event.swipeDirection);

      console.log("initWeekSlide>>>>>>>>>>>", this.weekSlides);
      setTimeout(() => {
        this.weekSlides.lockSwipeToPrev(false);
        this.weekSlides.lockSwipeToNext(false);
      }, 500);

      switch ($event.swipeDirection) {
        case "prev":
          console.log("initWeekSlide>>>>>ionSlidePrevStart>>>>>>>>>>>>>>", moment().format("YYYY-MM-DD HH:mm:ss:SSS"));

          this.onWeekChange.emit({
            swipeDirection: $event.swipeDirection,
            toMonth: this.weekData[this.weekSlides.getActiveIndex()].date
          });

          this.weekSlideActiveIndex = this.weekSlides.getActiveIndex();

          if (this.weekSlides.getActiveIndex() === 2) {
            console.log("this.weekSlides.getActiveIndex()>>>>>>>", this.weekSlides.getActiveIndex());
            this.weekSlideActiveIndex = this.weekSlides.getPreviousIndex();
            this.weekSlides.slideNext(0, false);
          }

          this.currentWeek = this.weekData[this.weekSlideActiveIndex].date.week();

          break;
        case "next":
          console.log("initWeekSlide>>>>>initWeekSlide>>>>>>>>>>>>>>", moment().format("YYYY-MM-DD HH:mm:ss:SSS"));

          this.onWeekChange.emit({
            swipeDirection: $event.swipeDirection,
            toMonth: this.weekData[this.weekSlides.getActiveIndex()].date
          });

          this.weekSlideActiveIndex = this.weekSlides.getActiveIndex();

          this.currentWeek = this.weekData[this.weekSlideActiveIndex].date.week();
          break;
      }

      this.slideMonthWhenWeekDayChange();

    });

    /**
     * slides向右滑动结束后
     */
    this.weekSlides.ionSlideNextStart.subscribe($event => {
      this.weekSlides.lockSwipeToNext(true);
    });

    /**
     * slides向左滑动结束后
     */
    this.weekSlides.ionSlidePrevStart.subscribe($event => {
      this.weekSlides.lockSwipeToPrev(true);
    });

  }

  /**
   * 周变更时变更月份
   */
  slideMonthWhenWeekDayChange() {
    let day = _.find(this.weekData[this.weekSlides.getActiveIndex()].weekdays, data => {
      return data.date.weekday() === this.selectDate.weekday();
    });
    if (day) {
      this.selectWeekDay(day, false);
      let calendar = _.find(this.calendarData, data => {
        return data.monthLabel === day.date.format("YYYY-MM");
      });
      if (calendar) {
        let monthIndex = _.indexOf(this.calendarData, calendar);
        if (monthIndex > -1 && monthIndex != this.monthSlideActiveIndex) {
          this.calendarSlides.slideTo(monthIndex, 0, true);
        }

        this.setSelectedDay(day);
      }
    }
  }

  ngAfterContentInit() {
    /*let calendarIonSlides = window["$"]("#calendarIonSlides");
    setTimeout(() => {
      this._targetRowOffsetTop = calendarIonSlides.find(".currentWeek").offset().top
        - calendarIonSlides.offset().top;
    }, 500);*/

  }

  initTouchEvent() {
    let startX = 0;
    let startY = 0;
    let moveEndX = 0;
    let moveEndY = 0;

    window["$"]("#calendarIonSlides").on("touchstart", $event => {
      startX = $event.originalEvent.changedTouches[0].pageX;
      startY = $event.originalEvent.changedTouches[0].pageY;

      if (this._targetRowOffsetTop === -1) {
        this._targetRowOffsetTop = window["$"](".rowIndex-"
            + this.calendarData[this.pageIndex].selectedWeekIndex).offset().top
          - window["$"](".calendarHeader").offset().top - window["$"](".item-divider").offset().top;
      }

      // console.log("calendarHeader.top>>>>>>>>>>>>", window["$"](".calendarHeader").offset().top);
      // console.log("_targetRowOffsetTop>>>>>>>>>>>", this._targetRowOffsetTop);
    });

    let marginTop = 0;
    window["$"]("#calendarIonSlides").on("touchmove", $event => {
      moveEndX = $event.originalEvent.changedTouches[0].pageX;
      moveEndY = $event.originalEvent.changedTouches[0].pageY;

      let X = moveEndX - startX;
      let Y = moveEndY - startY;

      if (Math.abs(X) > Math.abs(Y) && X > 0) {
        this._touchDirection = "right"
      } else {
        if (Math.abs(X) > Math.abs(Y) && X < 0) {
          this._touchDirection = "left";
        } else {
          if (Math.abs(Y) > Math.abs(X) && Y > 0) {
            this._touchDirection = "bottom";
          } else {
            if (Math.abs(Y) > Math.abs(X) && Y < 0) {
              this._touchDirection = "top";
            } else {
              this._touchDirection = "just touch";
            }
          }
        }
      }


      let calendarIonSlides = window["$"]("#calendarIonSlides");
      // console.log(calendarIonSlides.find(".row"));
      marginTop -= Math.abs(moveEndY - startY);

      switch (this._touchDirection) {
        case "top":
          /*calendarIonSlides.find(".notCurrentWeek").css({transform: "translateY(" + marginTop + "px)"});
           if (calendarIonSlides.find(".currentWeek").offset().top - calendarIonSlides.offset().top <= 0) {
           /!*calendarIonSlides.find(".currentWeek").css({transform: null});
           this.showCalendarRow = this.calendarData[this.pageIndex].selectedWeekIndex;*!/
           } else {
           calendarIonSlides.find(".currentWeek").css({transform: "translateY(" + marginTop + "px)"});
           }*/
          break;
        case "bottom":
          // this.showCalendarRow = -1;
          break;
      }

      startX = moveEndX;
      startY = moveEndY;
    });
  }

  /**
   * 初始风格样式
   */
  initStyle() {
    let calendarIonSlides = window["$"]("#calendarIonSlides");
    if (this.calendarSlides.autoHeight) {
      calendarIonSlides.css("height", "auto");
    } else {
      calendarIonSlides.css("height", "100%");
    }

    calendarIonSlides.find(".row").css({"minHeight": "6.6rem !important"});
  }

  initDays(momentObj, swipeDirection, callRunBack) {
    let isExit = _.find(this.calendarData, data => {
      return data["date"].format(this._monthFormat) === momentObj.format(this._monthFormat);
    });
    if (isExit) {//月份是否已生成
      console.log("该月份已经生成");
      return false;
    }

    // let momentDate = moment(dateStr);
    let currentMonth = momentObj.format(this._monthFormat);
    let startDayOfMonth = momentObj.startOf('month');
    let weekOfStartDay = startDayOfMonth.weekday();
    let dayOfYearStart = startDayOfMonth.dayOfYear() - weekOfStartDay;
    let days = new Array(42);
    _.forEach(days, (day, i) => {
      let dayObj = {
        badges: [],
        date: null,
        type: "",
        selected: "",
        isCurrent: false
      };

      dayObj.date = moment(momentObj.format(this._dateFormat)).dayOfYear(dayOfYearStart + i);
      if (dayObj.date.format(this._monthFormat) < currentMonth) {
        dayObj.type = "pre"
      }
      if (dayObj.date.format(this._monthFormat) > currentMonth) {
        dayObj.type = "next";
      }
      if (moment().format(this._dateFormat) === dayObj.date.format(this._dateFormat)) {
        dayObj.type += " current";
      }

      if (this.selectDate && this.selectDate.format(this._dateFormat) === dayObj.date.format(this._dateFormat)) {
        dayObj.selected = "selected";
      }

      days[i] = dayObj;
    });

    let dayIndex = 0;

    let dateData = {
      date: momentObj,
      monthLabel: momentObj.format(this._monthFormat),
      isShow: false,
      weeks: new Array(6),
      selectedWeekIndex: -1,
      currentWeekClassName: "notCurrentWeek"
    };
    _.forEach(dateData.weeks, (week, i) => {
      dateData.weeks[i] = new Array(7);
      _.forEach(dateData.weeks[i], (w, j) => {
        let day = days[dayIndex];

        if (day.selected === "selected") {
          dateData.selectedWeekIndex = i;
          dateData.currentWeekClassName = "currentWeek";
        }

        dateData.weeks[i][j] = {
          label: day.date.format("D"),
          date: day.date,
          text: "",
          badge: "",
          type: day.type,
          isCurrent: day.isCurrent,
          selected: day.selected
        };
        dayIndex++;
      });

    });

    switch (swipeDirection) {
      case "prev":
        this.calendarData = _.concat([dateData], this.calendarData);
        break;
      case "next":
        this.calendarData.push(dateData);
        break;
      default:
        this.calendarData.push(dateData);
        break;
    }

    if (callRunBack) {
      this.onCreateMonth.emit(dateData);
    }
  };

  initWeeks(momentObj, swipeDirection, callRunBack) {

    let isExit = _.find(this.weekData, data => {
      return data["date"].startOf("week").format(this._dateFormat) === momentObj.startOf("week").format("YYYY-MM-DD");
    });
    if (isExit) {//月份是否已生成
      console.log("该周已经生成");
      return false;
    }

    // let momentDate = moment(dateStr);
    let currentMonth = momentObj.format(this._monthFormat);
    let startDayOfWeek = momentObj.startOf('week');
    let days = new Array(7);
    _.forEach(days, (day, i) => {
      let dayObj = {
        badges: [],
        date: null,
        type: "",
        selected: "",
        isCurrent: false
      };

      dayObj.date = moment(startDayOfWeek).add(i, "day");

      if (moment().format(this._dateFormat) === dayObj.date.format(this._dateFormat)) {
        dayObj.type = "current";
      }

      if (this.selectDate && this.selectDate.format(this._dateFormat) === dayObj.date.format(this._dateFormat)) {
        dayObj.selected = "selected";
      }

      days[i] = dayObj;
    });

    let dayIndex = 0;

    let dateData = {
      date: momentObj,
      monthLabel: momentObj.format(this._monthFormat),
      isShow: false,
      weekdays: new Array(7),
      selectedWeekIndex: -1,
      currentWeekClassName: "notCurrentWeek"
    };
    _.forEach(dateData.weekdays, (weekday, i) => {
        let day = days[dayIndex];

        if (day.selected === "selected") {
          dateData.selectedWeekIndex = i;
          dateData.currentWeekClassName = "currentWeek";
        }

        dateData.weekdays[i] = {
          label: day.date.format("D"),
          date: day.date,
          text: "",
          badge: "",
          type: day.type,
          isCurrent: day.isCurrent,
          selected: day.selected
        };

        dayIndex++;

    });

    switch (swipeDirection) {
      case "prev":
        this.weekData = _.concat([dateData], this.weekData);
        break;
      case "next":
        this.weekData.push(dateData);
        break;
      default:
        this.weekData.push(dateData);
        break;
    }

    if (callRunBack) {
      this.onCreateWeek.emit(dateData);
    }

    console.log("initWeek>>>>>>>>>>>>>", this.weekData);
  }

  selectDay(day) {

    this.selectDate = day.date;
    this.onSelectDateChange.emit(this.selectDate);

    if (day.type.indexOf("pre") > -1) {
      this.pre(day);
    } else {
      if (day.type.indexOf("next") > -1) {
        this.next(day);
      } else {
        this.setSelectedDay(day);
      }
    }

  }

  pre(day) {
    this.calendarSlides.slidePrev(300, true);
    this.calendarSlidesChange("prev");
    this.setSelectedDay(day);
  }

  next(day) {
    this.calendarSlides.slideNext(300, true);
    this.calendarSlidesChange("next");
    this.setSelectedDay(day);
  }

  setSelectedDay(day) {
    let calendar = _.find(this.calendarData,  data => {
      return data.date.format(this._monthFormat) === day.date.format(this._monthFormat);
    });
    if (calendar) {
      _.forEach(calendar.weeks, (week, i) => {
        _.forEach(week, (w, j) => {
          if (w.date.format("YYYY-MM-DD") === day.date.format("YYYY-MM-DD")) {
            w.selected = "selected";
            calendar.selectedWeekIndex = i;
          } else {
            w.selected = "";
          }
        });
      });

      this.weekData = [];
      this.initWeeks(moment(day.date), null, false);
      this.weekSlideActiveIndex = 6;

      for(let i = 1; i <= 6; ++i) {
        let newWeek = moment(day.date).add(i, "week");
        this.initWeeks(newWeek, "next", false);
      }

      for(let i = 1; i <= 6; ++i) {
        let newWeek = moment(day.date).subtract(i, "week");
        this.initWeeks(newWeek, "prev", false);
      }

      this.weekSlides.slideTo(this.weekSlideActiveIndex, 0, false);
      this.setSelectWeekDay(day);
    }
  }

  selectWeekDay(day, setMonth) {
    console.log("selectWeekDay>>>>>>>>>>>>>>>>>", day.date.format(this._dateFormat), day);

    this.selectDate = day.date;
    this.onSelectDateChange.emit(this.selectDate);

    this.setSelectWeekDay(day);

    if (setMonth) {
      this.slideMonthWhenWeekDayChange();
      this.setSelectedDay(day);
    }
  }

  setSelectWeekDay(day) {
    console.log("setSelectWeekDay>>>>>>>>>>day>>>>>>", day);
    let week = _.find(this.weekData, data => {
      return moment(data["date"]).startOf("week").format(this._dateFormat) === moment(day.date).startOf("week").format(this._dateFormat);
    });

    if (week) {
      console.log(">>>>>>>>>>>>>>>>", _.indexOf(this.weekData, week));
      _.forEach(week.weekdays, weekday => {
        if (weekday.date.format(this._dateFormat) === day.date.format(this._dateFormat)) {
          weekday.selected = "selected";
        } else {
          weekday.selected = "";
        }
      });
      console.log("setSelectWeekDay>>>>>>>>>>", week);
    }
  }

  calendarSlidesChange(swipeDirection) {

    // this.currentDate = this.calendarData[this.calendarSlides.getActiveIndex()].date;
    if (swipeDirection === "next") {
      this.initDays(moment(this.calendarData[this.calendarSlides.getActiveIndex()].date).add(3, "month"), swipeDirection, true);
    }

    if (swipeDirection === "prev") {
      this.initDays(moment(this.calendarData[this.calendarSlides.getActiveIndex()].date).subtract(3, "month"), swipeDirection, true);
    }

    console.log("calendarSlidesChange>>>>>>>>>>>>", this.calendarData);

  }

  weekSlidesChange(swipeDirection) {

    // this.currentDate = this.calendarData[this.calendarSlides.getActiveIndex()].date;
    if (swipeDirection === "next") {
      this.initWeeks(moment(this.weekData[this.weekSlides.getActiveIndex()].date).add(3, "week"), swipeDirection, true);
    }

    if (swipeDirection === "prev") {
      this.initWeeks(moment(this.weekData[this.weekSlides.getActiveIndex()].date).subtract(3, "week"), swipeDirection, true);
    }

    console.log("weekSlidesChange>>>>>>>>>>>>", this.weekData);

  }

  initHammerSwipe() {
    let square = document.querySelector('.huawei-calendar');
    let manager = new window["Hammer"].Manager(square);
    let Swipe = new window["Hammer"].Swipe();
    manager.add(Swipe);

    let deltaX = 0;
    let deltaY = 0;

    manager.on('swipe', e => {
      this.isFirstShowWeek = false;

      deltaX = deltaX + e.deltaX;
      let direction = e.offsetDirection;
      switch (direction) {
        case 2://left
          break;
        case 4://right
          break;
        case 8://up
          this.isShowByWeek = true;
          break;
        case 16://down
          this.isShowByWeek = false;
          break;
      }

      this.onShowByWeek.emit({
        isShowByWeek: this.isShowByWeek
      });
    });
  }

}
