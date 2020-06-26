import { Component, OnInit, AfterContentInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LineChartComponent implements OnInit {
  
  //Decorators
  @Input() transitionTime: number;
  @Input() ChartData: any;

  //Initialisers
  hostElement;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit() {
  }

}
