import { Component, OnInit } from '@angular/core';
import data from './../../../datastore/sunburst.json';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  sunburst_NetPresentValue = data;
  status: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
