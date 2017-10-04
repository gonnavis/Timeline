import { Component, OnInit } from '@angular/core';
import { TimelineService } from './timeline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  periodHeight=30;
  zoom=0.3;
  bias=0;
  totalWidth=0;
  min;
  zoomStep=0.1;
  zoomMin=0.1;
  zoomFix=1;
  constructor(private timelineService: TimelineService) { }
  ngOnInit() {
    console.log(this.timelineService.data);
    console.log(this.timelineService.rowData);
  }
  test(){
  }
  areas=[1]
  rows=this.timelineService.rowData
}