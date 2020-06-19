import { Component, OnInit, AfterContentInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { callbackify } from 'util';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LineChartComponent implements AfterContentInit {
  
  hostElement;    // Native element hosting the SVG container
  // 2. Use the margin convention practice 
  margin = {top: 50, right: 50, bottom: 50, left: 50};
  width = window.innerWidth - this.margin.left - this.margin.right; // Use the window's width 
  height = window.innerHeight - this.margin.top - this.margin.bottom; // Use the window's height

  // The number of datapoints
  n = 21;

  // 5. X scale will use the index of our data
  xScale = d3.scaleLinear()
      .domain([0, this.n-1]) // input
      .range([0, this.width]); // output

  // 6. Y scale will use the randomly generate number 
  yScale = d3.scaleLinear()
      .domain([0, 1]) // input 
      .range([this.height, 0]); // output 

  // 7. d3's line generator
  line = d3.line()
      .x(function(d, i) { return this.xScale(i); }) // set the x values for the line generator
      .y(function(d) { return this.yScale(d.y); }) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

  @Input() transitionTime: number;
  @Input() ChartData: any;


  
  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this.call();
  }

  call(){


    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = d3.range(this.n).map(function(d) { return {"y": d3.randomUniform(1)() } })

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select(this.hostElement).append('svg')
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(this.xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(this.yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", this.line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return this.xScale(i) })
        .attr("cy", function(d) { return this.yScale(d.y) })
        .attr("r", 5)

  }



  






}
