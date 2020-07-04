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
   
    var t = d3.transition()
      .duration(750)
      .ease(d3.easeLinear);


    var data = this.ChartData;

    if (typeof this.Selection === 'string') {
      var displayPath = this.Selection.split('/');
      var dataGroup =  displayPath[0];
      var dataBranch = displayPath[1];
    } else {
      var dataGroup = 'Assets';
      var dataBranch = 'Property';
    }


    console.log(dataGroup, dataBranch)


    var margin = {top: 30, right: 150, bottom: 80, left: 60};
    var width = 1024 - margin.left - margin.right;
    var height = 768 - margin.top - margin.bottom;
    var parse = d3.timeParse("%m/%d/%Y");
    var colors = d3.scaleOrdinal(d3.schemeCategory10);
    var svg = d3.select("#linechart")

    var domain = [];
    data[dataGroup][0][dataBranch].map(displayGroupItems => {
      displayGroupItems.values.forEach(displayGroupItemValues => {
        domain.push(displayGroupItemValues.value)
      });
    })


    var xScale = d3.scaleTime()
        .range([30, width - 20])
        .domain(d3.extent(data[dataGroup][0][dataBranch][0].values, d => parse(d.date)));


    var yScale = d3.scaleLinear()
        .range([height - 20, 20])
        .domain( 
          d3.extent(domain)
        ).nice();






    var lineGen = d3.line()
        .x(d => xScale(parse(d.date)))
        .y(d => yScale(d.value));

    var valuePaths = d3.select("#linechart g.lines").selectAll(".lineElements")

    valuePaths.data(data[dataGroup][0][dataBranch])
        .join(
          enter => enter.append("path").attr("class", "lineElements")
              .attr("fill", "none")
              .attr("d", d => lineGen(d.values) )
              .attr("stroke", (d, i) => colors(i))
            .call(enter => enter.transition(t) 
          ),
          update => update
              .attr("stroke", (d, i) => colors(i))
            .call(update => update.transition(t)           
              .attr("d", d => lineGen(d.values) )
            ),
          exit => exit
            .call(exit => exit.transition(t) )
              .remove()
        )
  

    var gY = svg.select("g.yaxis").call(d3.axisLeft(yScale));

  }


  ngOnInit() {
  
    var data = this.ChartData;
    var dataGroup =  'Assets';
    var dataBranch = 'Property';

    this.chart(data, dataGroup, dataBranch);
  }

  chart(data, dataGroup, dataBranch) {

    var margin = {top: 30, right: 150, bottom: 80, left: 60};
    var width = 1024 - margin.left - margin.right;
    var height = 768 - margin.top - margin.bottom;
    var domain = [];
    data[dataGroup][0][dataBranch].map(displayGroupItems => {
      displayGroupItems.values.forEach(displayGroupItemValues => {
        domain.push(displayGroupItemValues.value)
      });
    })

    var svg = d3.select("#linechart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var parse = d3.timeParse("%m/%d/%Y");

    var xScale = d3.scaleTime()
        .range([30, width - 20])
        .domain(d3.extent(data[dataGroup][0][dataBranch][0].values, d => parse(d.date)));

        var yScale = d3.scaleLinear()
        .range([height - 20, 20])
        .domain( 
          d3.extent(domain)
        ).nice();

    var lineGen = d3.line()
        .x(d => xScale(parse(d.date)))
        .y(d => yScale(d.value));

  
    var lines = svg.append("g").attr("class", "lines")
        .selectAll(".lineElements")
        .data(data.Assets[0][dataBranch])
        .join("path")
          .attr("d", d => lineGen(d.values))
          .attr("fill", "none")
          .attr("stroke", (d, i) => colors(i))
          .attr('class', 'lineElements');


    var gX = svg.append("g").attr("transform", "translate(0," + (height - 20) + ")").call(d3.axisBottom(xScale));

    var gY = svg.append("g").attr("class", "yaxis").attr("transform", "translate(30,0)").call(d3.axisLeft(yScale));

  }








}
