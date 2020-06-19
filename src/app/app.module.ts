import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconComponent } from './components/icon/icon.component';
import { SunburstChartComponent } from './components/sunburst-chart/sunburst-chart.component';
import { OverviewComponent } from './views/overview/overview.component';
import { TimelineComponent } from './views/timeline/timeline.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    IconComponent,
    SunburstChartComponent,
    OverviewComponent,
    TimelineComponent,
    LineChartComponent
  ],
  exports: [
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
