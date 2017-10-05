import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import{TimelineService}from'./service/timeline.service';

@NgModule({
  imports: [ BrowserModule, FormsModule, ],
  declarations: [ AppComponent ],
  providers: [TimelineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
