import { Component, OnInit } from '@angular/core';
import data from './../../../datastore/simpleLineChart.json';

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
