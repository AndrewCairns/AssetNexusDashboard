import { Component, OnInit } from '@angular/core';
import data2 from './../../../datastore/simpleLineChart.json';
import data from './../../../datastore/linechartData.json';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timelineData = data;
  public clickedEvent: Event;

  constructor() { }

  ngOnInit(): void {
  }

  childEventClicked(event) {
    this.clickedEvent = event;
  }

}
