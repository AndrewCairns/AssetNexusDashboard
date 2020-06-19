import { Component, OnInit } from '@angular/core';
import data from './../../../datastore/linechartData.json';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timelineData = data;
  
  constructor() { }

  ngOnInit(): void {
  }

}
