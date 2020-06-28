import { Component, OnInit, AfterContentInit, Input, ElementRef, ViewEncapsulation, SimpleChanges } from '@angular/core';
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
  @Input() Selection: string;

  //Initialisers
  hostElement;

  


  
  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    var data = this.ChartData;
    var displayGroup;

    if (typeof this.Selection === 'string') {
      displayGroup = this.Selection.trim();
    } else {
      displayGroup = 'Property';
    }

    this.chart(data, displayGroup);
  }


  ngOnInit() {

    var data = this.ChartData;
    var displayGroup = this.Selection || 'Property';

    this.chart(data, displayGroup);
 
  }

  chart(data, displayGroup) {
    console.log(data.Assets[0][displayGroup][0].values)

    var margin = {top: 30, right: 150, bottom: 80, left: 60};
    var width = 1024 - margin.left - margin.right;
    var height = 768 - margin.top - margin.bottom;
    
    var svg = d3.select("#linechart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var parse = d3.timeParse("%m/%d/%Y");

    var xScale = d3.scaleTime()
        .range([30, width - 20])
        .domain(d3.extent(data.Assets[0][displayGroup][0].values, d => parse(d.date)));

    var yScale = d3.scaleLinear()
        .range([height - 20, 20])
        .domain([0, 80]);

    var lineGen = d3.line()
        .x(d => xScale(parse(d.date)))
        .y(d => yScale(d.value));

    var lines = svg.selectAll(".foo")
        .data(data.Assets[0][displayGroup])

        lines.enter().append("path")
          .attr("d", d => lineGen(d.values))
          .attr("fill", "none")
          .attr("stroke", (d, i) => colors(i));

        lines.transition();

        lines.exit().remove();

    var gX = svg.append("g").attr("transform", "translate(0," + (height - 20) + ")").call(d3.axisBottom(xScale));

    var gY = svg.append("g").attr("transform", "translate(30,0)").call(d3.axisLeft(yScale));

  }








}
