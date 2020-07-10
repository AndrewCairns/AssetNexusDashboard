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
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';
import { SelectorButtonComponent } from './components/selector-button/selector-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    IconComponent,
    SunburstChartComponent,
    OverviewComponent,
    TimelineComponent,
    LineChartComponent,
    SelectComponent,
    SelectorButtonComponent
  ],
  exports: [
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
