import { Component, OnInit, HostListener } from '@angular/core';

import { TIMELINES } from './data/timelines';

import { Timeline } from './type/timeline';

import { TimelineService } from './service/timeline.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  periodHeight: number = 30;
  zoom: number = 0.3;
  bias: number = 0;
  totalWidth: number = 0;
  min: number;
  zoomStep: number = 0.1;
  zoomMin: number = 0.1;
  zoomFix: number = 1;
  TIMELINES: Timeline[] = TIMELINES;
  timelines: Timeline[] = [];
  constructor(private timelineService: TimelineService) { }
  ngOnInit() {
    var _this = this;
    // console.log(this.timelineService.data);
    // console.log(this.timelineService.rowData);
    this.timelineService.processTimelines(TIMELINES)
    console.log(this.timelines)
    this.addTimeline(TIMELINES[0]);
    window.addEventListener('mousewheel', function (e) {
      _this.mouseWheel(e)
    })
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
      if (timeline.name == '地球史') {
        this.zoom = 0.0000003;
        this.zoomStep = 0.0000001;
        this.zoomMin = 0.0000001;
        this.zoomFix = 7;
      }
    }
    else {
      this.removeTimeline(timeline);
      if (timeline.name == '地球史') {
        location.reload();
      }
    }
  }
  removeTimeline(timeline: Timeline) {
    this.timelines.splice(this.timelines.indexOf(timeline), 1);
    timeline.act = false;
  }
  zoomOut(): void {
    if (this.zoom <= this.zoomMin) {
      return;
    }
    this.zoom = +(this.zoom - this.zoomStep).toFixed(this.zoomFix);
  }
  zoomIn(): void {
    this.zoom = +(this.zoom + this.zoomStep).toFixed(this.zoomFix);
  }
  mouseWheel(event:any): void {
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {//mouseWheelUp
      this.zoom = +(this.zoom + this.zoomStep).toFixed(this.zoomFix);
    }
    else if (delta < 0) {//mouseWheelDown
      this.zoom = +(this.zoom - this.zoomStep).toFixed(this.zoomFix);
    }
  }
}