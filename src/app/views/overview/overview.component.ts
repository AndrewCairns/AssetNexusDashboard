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
    { "value": "3", "subtitle": "Will revisions", "icon": "calendar", "iconColorClass": "icon-color-brand-alt" },
    { "value": "4", "subtitle": "Trusted Friends", "icon": "fingerprint", "iconColorClass": "icon-color-brand-alt" },
    { "value": "1", "subtitle": "Trustees", "icon": "check", "iconColorClass": "icon-color-brand-alt" },
    { "value": "2", "subtitle": "Beneficiaries", "icon": "portfolio", "iconColorClass": "icon-color-brand-alt" },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
