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

  metric_block_data = [
    { "value": "180k", "subtitle": "Asset Total", "icon": "will", "iconColorClass": "icon-color-brand-alt" },
    { "value": "-123k", "subtitle": "Total Debt ", "icon": "will", "iconColorClass": "icon-color-brand-alt" },
    { "value": "80k", "subtitle": "Insurance Total", "icon": "will", "iconColorClass": "icon-color-brand-alt" },
    { "value": "223k", "subtitle": "Net Present Value", "icon": "portfolio", "iconColorClass": "icon-color-brand-alt" },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
