import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { TIMELINES } from './data/timelines';

import { Timeline } from './type/timeline';
import { Period } from './type/period';

import { TimelineService } from './service/timeline.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private timelineService: TimelineService,
    private sanitizer: DomSanitizer,
  ) { }
  periodHeight: number = 30;
  zoom: number = 0.3;
  bias: number = 0;
  totalWidth: number = 0;
  min: number;// minimun year of all previous added (include already removed) timeline
  zoomStep: number = 0.1;
  zoomMin: number = 0.1;
  zoomFix: number = 2;
  mouseTime: number = 0;
  rulerHeight: number = 24;
  headHeight: number = 0;
  isMouseDown: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  scale: number = 1;
  transform: SafeStyle;
  is_show_contact:boolean=false;
  TIMELINES: Timeline[] = TIMELINES;
  timelines: Timeline[] = [];
  ngOnInit() {
    this.setTransform();
    // console.log(this.timelineService.data);
    // console.log(this.timelineService.rowData);
    this.timelineService.processTimelines(TIMELINES)
    // console.log(this.timelines);
    console.log(TIMELINES);
    this.addTimeline(TIMELINES[0]);
    window.addEventListener('resize', event => {
      this.setHeadHeight();
    })
    window.addEventListener('mousewheel', event => {
    })
    window.addEventListener('mousedown', event => {
    })
    window.addEventListener('mouseup', event => {
    })
    window.addEventListener('mousemove', event => {
    })
    // window.dispatchEvent(new Event('resize'));
    setTimeout(() => {
      this.setHeadHeight();
      document.body.scrollLeft = 0;
    }, 0)
  }
  wheelUp(event: any) {
    this.zoomIn();
  }
  wheelDown(event: any) {
    this.zoomOut();
  }
  setTransform(): void {
    this.transform = this.sanitizer.bypassSecurityTrustStyle(` translateY(${this.translateY}px) translateX(${this.translateX}px) scale(${this.scale})`);
  }
  setHeadHeight() {
    var optionHeight = document.getElementById('option').clientHeight;
    this.headHeight = optionHeight + this.rulerHeight;
  }
  addTimeline(timeline: Timeline) {
    this.timelines.push(timeline)
    if (this.bias < -timeline.min) {
      this.bias = -timeline.min;
    }
    if (this.totalWidth < timeline.span) {
      this.totalWidth = timeline.span;
    }
    if (this.min) {
      if (timeline.min < this.min) {
        this.min = timeline.min;
      }
    }
    else {
      this.min = timeline.min;
    }
    timeline.act = true;
  }
  optionTimelineChange(timeline: Timeline) {
    if (timeline.act) {
      this.addTimeline(timeline);
      // if (timeline.name == '地球史') {
      //   this.zoom = 0.0000003;
      //   this.zoomStep = 0.0000001;
      //   this.zoomMin = 0.0000001;
      //   this.zoomFix = 7;
      // }
    }
    else {
      this.removeTimeline(timeline);
      // if (timeline.name == '地球史') {
      //   location.reload();
      // }
    }
  }
  removeTimeline(timeline: Timeline) {
    this.timelines.splice(this.timelines.indexOf(timeline), 1);
    timeline.act = false;
  }
  areas_mousewheel(event): void {
    // if (event.ctrlKey || event.altKey || event.shiftKey) {
    //   return false;
    // }
    event.preventDefault();
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {//mouseWheelUp
      this.wheelUp(event);
    }
    else if (delta < 0) {//mouseWheelDown
      this.wheelDown(event);
    }
  }
  areas_mousedown(event): void {
    if(event.button===0){
      event.preventDefault();
      this.isMouseDown = true;
    }
  }
  areas_mouseup(event): void {
    event.preventDefault();
    this.isMouseDown = false;
  }
  areas_mouseleave(event): void {
    event.preventDefault();
    this.isMouseDown = false;
  }
  areas_mousemove(event): void {
    event.preventDefault();
    let deltaX = event.pageX - this.mouseX;
    let deltaY = event.pageY - this.mouseY;
    // console.log(deltaX, deltaY);
    if (this.isMouseDown) {
      this.translateX += deltaX;
      this.translateY += deltaY;
      this.setTransform();
    }
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
    this.mouseTime = Math.floor((this.mouseX - this.translateX) / this.zoom + this.min);

  }
  zoomIn(): void {
    let prevZoom = this.zoom;

    this.zoomStep = this.zoom / 10;
    this.zoom = +(this.zoom + this.zoomStep).toFixed(this.zoomFix);

    this.translateX += -((this.mouseTime - this.min) * this.zoom - (this.mouseTime - this.min) * prevZoom);
    this.setTransform();
  }
  zoomOut(): void {
    let prevZoom = this.zoom;

    let zoom: number;
    this.zoomStep = this.zoom / 10;
    zoom = +(this.zoom - this.zoomStep).toFixed(this.zoomFix);
    if (zoom > this.zoomMin) {
      this.zoom = zoom;

      this.translateX += ((this.mouseTime - this.min) * prevZoom - (this.mouseTime - this.min) * this.zoom);
      this.setTransform();
    }
  }
  periodMousedown(event,period:Period):void{
    if(event.button===2){
      period.right_clicked=!period.right_clicked;
    }
  }
  periodMouseenter(event): void {
    var period = event.currentTarget;
    var name = period.querySelector('.name')
    var nameTextNode = name.childNodes[0];
    if (nameTextNode.clientWidth > period.clientWidth) {
      name.style.top = '-45px';
      nameTextNode.style.backgroundColor = 'white';
    }
  }
  periodMouseleave(event,period:Period): void {
    var dom = event.currentTarget;
    var name = dom.querySelector('.name')
    var nameTextNode = name.childNodes[0];
    name.style.top = 0;
    nameTextNode.style.backgroundColor = 'transparent';

    period.right_clicked=false;
  }
  areasLoaded(event): void {
    console.log('load');
  }
}