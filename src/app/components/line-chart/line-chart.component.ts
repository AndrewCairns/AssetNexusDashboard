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
    // var data = this.ChartData.Assets[0].Property[0].values;
    var data = this.ChartData.Assets[0].Property[0].values;
    console.log(data);


    var margin = {top: 30, right: 150, bottom: 80, left: 60};
    var width = 1024 - margin.left - margin.right;
    var height = 768 - margin.top - margin.bottom;
    
    var dataGroup = d3.select("#linechart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


    var parseTime = d3.timeParse("%m/%d/%Y");

    var x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return parseTime( d.date ); }))
        .range([0, width]);

    var y1 = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.value; }))
        .range([height, 0])
        .nice();



    var leftValues = ["value"];

    var colours1 = d3.schemeSet1;

    var allValues = [];

    for (var i = 0; i < leftValues.length; i++) {
        plotVariableLeft(leftValues[i], colours1[i]);
        allValues.push({ color: colours1[i], title: leftValues[i]});
    }


    function plotVariableLeft(propertyName, colour) {
      var line = d3.line()
          .x(d => x( parseTime( d.date ) ))
          .y(d => y1(d[propertyName]))
          .curve(d3.curveMonotoneX);
    
      dataGroup.append("path")
          .data([data])
          .attr("fill", "none")
          .attr("stroke", colour)
          .attr("d", line);
    }
        
    var xAxisGroup = dataGroup
                        .append("g")
                        .attr("class", "xAxisGroup")
                        .attr("transform", "translate(0," + (height + 10) + ")");

    var xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%d %b %y"));

    xAxis(xAxisGroup);

 
 
    var yAxisGroup = dataGroup
                        .append("g")
                        .attr("class", "y1AxisGroup")
                        .attr("transform", "translate( " + -10 + ", 0 )");

    var yAxis = d3.axisLeft(y1);

    yAxis(yAxisGroup);

 
    xAxisLabel(dataGroup, "Date");
    yAxisLabel(dataGroup, "Value");
    
    function xAxisLabel(dg, text) {
        dg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 40) + ")")
            .style("text-anchor", "middle")
            .text(text);
    }
    
    function yAxisLabel(dg, text) {
        dg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(text);
    }
    

    


    // circlePointsLeft(leftValues, dataGroup);

    // function circlePointsLeft(propertyNames, dg) {
    //     data.forEach(function (point) {
    //         for (var i = 0; i < propertyNames.length; i++) {
    //             dg.append("circle")
    //                 .attr("fill", d3.schemeDark2[i])
    //                 .attr("r", 3)
    //                 .attr("cx", x( parseTime( point.date ) ))
    //                 .attr("cy", y1(point[propertyNames[i]]))
    //                 .append("title")
    //                 .text("Date: " + d3.timeFormat("%Y-%m-%d")( parseTime( point.date ) ) + "\n" + propertyNames[i] + ": " + point[propertyNames[i]]);
    //         }
    //     });
    // }


 
 
 
    // drawLegend(dataGroup);

    // function drawLegend(dg) {
    //     var legend = dg
    //       .append("g")
    //       .attr("x", width - 65)
    //       .attr("y", 25)
    //       .attr("fill", "none")
    //       .attr("width", width)
    //       .attr("height", height);
    
    
    //     allValues.forEach(function (x, i) {
    //       legend.append("rect")
    //           .attr("fill", x.color)
    //           .attr("x", width + 60)
    //           .attr("y", i * 25)
    //           .attr("width", 30)
    //           .attr("height", 3)
    //           .append("title")
    //           .text(x.title);
    
    //       var title = x.title.length < 8 ? x.title : x.title.substring(0, 8) + "...";
    
    //       legend.append("text")
    //           .text(title)
    //           .attr("font-size", "12pt")
    //           .attr("fill", x.color)
    //           .attr("x", width + 95)
    //           .attr("y", i * 25 + 8);
    
    //   });
    // }
 
 

    // function drawGridlines() {
    //   var y1Gridlines = d3.axisLeft(y1)
    //           .ticks(20)
    //           .tickFormat("")
    //           .tickSize(-width);
  
    //   var gridY = dataGroup
    //           .append("g")
    //           .attr("class", "grid")
    //           .call(y1Gridlines);
  
    //   gridY.call(y1Gridlines);
  
    //   var xGridlines = d3.axisBottom(x)
    //       .ticks(20)
    //       .tickFormat("")
    //       .tickSize(height);
  
    //   var gridX = dataGroup.append("g")
    //       .attr("class", "grid")
    //       .call(xGridlines);
  
    //   gridX.call(xGridlines);
    // }

  


  // const refLineValues = { x1Value: '11/05/2018', x2Value: '11/05/2018', y1Value: 0,  y2Value: 65};
  // referenceLine(dataGroup, refLineValues.x1Value, refLineValues.x2Value, refLineValues.y1Value, refLineValues.y2Value);

  // function referenceLine(dg, x1Value, x2Value, y1Value, y2Value) {
  //     dg.append('line')
  //         .attr('x1', x(parseTime(x1Value)))
  //         .attr('y1', y1(y1Value))
  //         .attr('x2', x(parseTime(x2Value)))
  //         .attr('y2', y1(y2Value))
  //         .attr('class', 'refLine');
  // }

 
 
 
 
 
 
 
 
 
 
  }










}
