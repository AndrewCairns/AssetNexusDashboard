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



  //Chart Config
  margin = {top: 30, right: 150, bottom: 80, left: 60};
  width = 1024 - this.margin.left - this.margin.right;
  height = 768 - this.margin.top - this.margin.bottom;
  parse = d3.timeParse("%m/%d/%Y");
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  svg = d3.select("#linechart")
  Ydomain = [];
  Xdomain = [];
  yScale;
  xScale;
  yAxis;
  xAxis;
  lineGen = d3.line()
      .x(d => this.xScale(this.parse(d.date)))
      .y(d => this.yScale(d.value));  
  t = d3.transition()
    .duration(7050)
    .ease(d3.easeLinear);


  // Data
  data = this.ChartData;
  displayPath;
  dataGroup =  'Assets';
  dataBranch = 'Property';






  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }






  ngOnChanges(changes) {

    if (typeof this.Selection === 'string') {
      this.displayPath = this.Selection.split('/');
      this.dataGroup =  this.displayPath[0];
      this.dataBranch = this.displayPath[1];
    } else {
      this.dataGroup = 'Assets';
      this.dataBranch = 'Property';
    }
    
    this.updateChart(this.ChartData, this.dataGroup, this.dataBranch )
  }



  ngOnInit() {
    this.createChart(this.ChartData, this.dataGroup, this.dataBranch);
  }




  createChart(data, dataGroup, dataBranch) {

    // Domain scale function - TODO
    data[dataGroup][0][dataBranch].map(displayGroupItems => {
      displayGroupItems.values.forEach(displayGroupItemValues => {
        this.Ydomain.push(displayGroupItemValues.value)
        this.Xdomain.push( this.parse(displayGroupItemValues.date));
      });
    })


    const svg = d3.select("#linechart")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("class", "lines")
      .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")");

    this.xScale = d3.scaleTime()
      .range([30, this.width - 20])
      .domain(d3.extent(this.Xdomain));

    this.yScale = d3.scaleLinear()
      .range([this.height - 20, 20])
      .domain( d3.extent(this.Ydomain) )
      .nice();

    this.xAxis = svg.append("g").attr("class", "xaxis").attr("transform", "translate(0," + (this.height - 20) + ")").call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append("g").attr("class", "yaxis").attr("transform", "translate(30,0)").call(d3.axisLeft(this.yScale));
  

    // Applys data to plot area
    this.updateChart(data, dataGroup, dataBranch)

  }




  updateChart(data, dataGroup, dataBranch) {
    this.Ydomain = [];

    // Domain scale function - TODO
    data[dataGroup][0][dataBranch].map(displayGroupItems => {
      displayGroupItems.values.forEach(displayGroupItemValues => {
        this.Ydomain.push(displayGroupItemValues.value)
        this.Xdomain.push( this.parse(displayGroupItemValues.date));
      });
    })

    this.yScale = d3.scaleLinear()
      .range([this.height - 20, 20])
      .domain( d3.extent(this.Ydomain) );
    
    this.xScale = d3.scaleTime()
      .range([30, this.width - 20])
      .domain(d3.extent(this.Xdomain));

    d3.select("g.yaxis").transition(this.t)
      .call(d3.axisLeft(this.yScale));
    d3.select("g.xaxis").transition(this.t)
      .call(d3.axisBottom(this.xScale));

      




    var valuePaths = d3.select("#linechart g.lines").selectAll(".lineElements")

    valuePaths.data(data[dataGroup][0][dataBranch])
        .join(
          enter => enter.append("path").attr("class", "lineElements")
              .attr("fill", "none")
              .attr("d", d => this.lineGen(d.values) )
              .attr("stroke", (d, i) => this.colors(i))
            .call(enter => enter.transition(this.t) 
          ),
          update => update
              .attr("stroke", (d, i) => this.colors(i))
            .call(update => update.transition(this.t)           
              .attr("d", d => this.lineGen(d.values) )
            ),
          exit => exit
            .call(exit => exit.transition(this.t) )
              .remove()
        )

 


  }







}
