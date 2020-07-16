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
  @Input() opacitySelection: any;

  //Initialisers
  hostElement;



  //Chart Config
  margin = { top: 150, right: 150, bottom: 80, left: 60 };
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
    .duration(750)
    .ease(d3.easeLinear);


  // Data
  data;
  displayPath;
  dataGroup = 'Assets';
  dataBranch = 'Property';





  margin2 = { top: 10, right: 150, bottom: 80, left: 60 };
  height2 = 100;
  xAxis2;
  //xscale
  xScale2;
  //yscale
  yScale2;


  lineGen2 = d3.line()
    .x(d => this.xScale2(this.parse(d.date)))
    .y(d => this.yScale2(d.value));

  area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => this.xScale2(this.parse(d.date)))
    .y0(this.height2)
    .y1(d => this.yScale2(d.value));










  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }




  ngOnChanges(changes: SimpleChanges) {

    if (typeof this.Selection === 'string') {
      this.displayPath = this.Selection.split('/');
      this.dataGroup = this.displayPath[0];
      this.dataBranch = this.displayPath[1];
    } else {
      this.dataGroup = 'Assets';
      this.dataBranch = 'Property';
    }

    this.updateChart(this.ChartData, this.dataGroup, this.dataBranch)
  }



  ngOnInit() {
    this.createChart(this.ChartData, this.dataGroup, this.dataBranch);
  }




  createChart(data, dataGroup, dataBranch) {

    // Domain scale function - TODO
    data[dataGroup][0][dataBranch].map(displayGroupItems => {
      displayGroupItems.values.forEach(displayGroupItemValues => {
        this.Ydomain.push(displayGroupItemValues.value)
        this.Xdomain.push(this.parse(displayGroupItemValues.date));
      });
    })


    const svg = d3.select("#linechart")
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + 1024 + ' ' + 768)
      .append("g")
      .attr("class", "lines")
      .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")");

    this.xScale = d3.scaleTime()
      .range([30, this.width - 20])
      .domain(d3.extent(this.Xdomain));

    this.yScale = d3.scaleLinear()
      .range([this.height - 20, 20])
      .domain(d3.extent(this.Ydomain))
      .nice();

    this.xAxis = svg.append("g").attr("class", "xaxis").attr("transform", "translate(0," + (this.height - 20) + ")").call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append("g").attr("class", "yaxis").attr("transform", "translate(30,0)").call(d3.axisLeft(this.yScale));









    const contextlineGroups = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + 0 + "," + this.margin2.top + ")");

    var context = contextlineGroups.selectAll("g")

    this.xAxis2 = svg.append("g")
      .attr("class", "xaxis2")
      .attr("transform", "translate(0," + this.height2 + ")")
      .call(d3.axisBottom(this.xScale));




    // Applys data to plot area
    this.updateChart(data, dataGroup, dataBranch)

  }




  updateChart(data, dataGroup, dataBranch) {
    this.Ydomain = [];
    this.Xdomain = [];

    // Domain scale function - TODO
    data[dataGroup][0][dataBranch].map((displayGroupItems, i) => {
      displayGroupItems.color = this.colors(i);
      displayGroupItems.values.forEach(displayGroupItemValues => {
        this.Ydomain.push(displayGroupItemValues.value)
        this.Xdomain.push(this.parse(displayGroupItemValues.date));
      });
    })

    this.yScale = d3.scaleLinear()
      .range([this.height - 20, 20])
      .domain(d3.extent(this.Ydomain));

    this.xScale = d3.scaleTime()
      .range([30, this.width - 20])
      .domain(d3.extent(this.Xdomain));

    d3.select("g.yaxis").transition(100)
      .call(d3.axisLeft(this.yScale));
    d3.select("g.xaxis").transition(100)
      .call(d3.axisBottom(this.xScale));



    var valuePaths = d3.select("#linechart g.lines").selectAll(".lineElements")

    valuePaths.data(data[dataGroup][0][dataBranch])
      .join(
        enter => enter.append("path").attr("class", "lineElements")
          .attr("fill", "none")
          .attr("d", d => this.lineGen(d.values))
          .style('clip-path', 'url(#clip)') //<-- apply clipping
          .attr("stroke", (d, i) => this.colors(i))
          .call(enter => enter.transition(this.t)
          ),
        update => update
          .attr("stroke", (d, i) => this.colors(i))
          .attr("opacity", (d) => d.opacity)
          .call(update => update.transition(this.t)
            .attr("d", d => this.lineGen(d.values))
          ),
        exit => exit
          .call(exit => exit.transition(this.t))
          .remove()
      )












    this.xScale2 = d3.scaleTime()
      .range([30, this.width - 20])
      .domain(d3.extent(this.Xdomain));

    this.yScale2 = d3.scaleLinear()
      .range([this.height2 - 20, 20])
      .domain(d3.extent(this.Ydomain));



    var context = d3.select("#linechart g.context").selectAll('.lineElementsContext');


    context.data(data[dataGroup][0][dataBranch])
      .join(
        enter => enter.append("path").attr("class", "lineElementsContext")
          .attr("fill", "red")
          .attr("d", d => this.area(d.values))
          .call(enter => enter.transition(this.t)
          ),
        update => update
          .attr("opacity", (d) => d.opacity)
          .call(update => update.transition(this.t)
            .attr("d", d => this.area(d.values))
          ),
        exit => exit
          .call(exit => exit.transition(this.t))
          .remove()
      )






    var brush = d3.brushX()
      .extent([[30, 0], [this.width - 20, this.height2]])
      .on("brush end", brushed.bind(this));

    var context2 = d3.select("#linechart g.context")

    d3.select("#linechart").append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width - 50)
      .attr("height", this.height)
      .attr("transform", "translate(30,0)")

    d3.select("#linechart .brush").remove(); // clears brush scrolling element

    context2.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, this.xScale2.range());








    function brushed() {
      let extent = d3.event.selection;
      let xsDomain = extent.map(this.xScale2.invert, this.xScale2);
      this.xScale.domain(xsDomain);
      let xScaleDomain = this.xScale.domain();

      let dataFiltered = [];
      data[dataGroup][0][dataBranch].forEach(displayGroupItems => {
        displayGroupItems.values.forEach((displayGroupItemValues) => {
          if ((this.parse(displayGroupItemValues.date) >= xScaleDomain[0]) && (this.parse(displayGroupItemValues.date) <= xScaleDomain[1])) {
            dataFiltered.push(displayGroupItemValues.value);
          };
        })
      })

      this.yScale3 = d3.scaleLinear()
        .range([this.height - 20, 20])
        .domain(d3.extent(dataFiltered));

      this.yScale3.domain(d3.extent(dataFiltered));

      d3.select("#linechart g.lines").selectAll(".lineElements").attr("d", d => this.lineGen(d.values))
      d3.select(".xaxis").call(d3.axisBottom(this.xScale));
      d3.select("g.yaxis").transition(50)
        .call(d3.axisLeft(this.yScale3));

    }



  }







}
