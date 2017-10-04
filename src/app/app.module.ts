import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import{TimelineService}from'./service/timeline.service';

// import { MouseWheelDirective } from './directive/mousewheel.directive';

@NgModule({
  imports: [ BrowserModule, FormsModule, ],
  declarations: [ AppComponent,/* MouseWheelDirective, */ ],
  providers: [TimelineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
