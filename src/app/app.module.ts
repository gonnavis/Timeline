import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import{TimelineService}from'./service/timeline.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimelineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
