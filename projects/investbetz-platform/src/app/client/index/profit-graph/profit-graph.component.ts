import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DailyProfitGraphInterface } from './profit-graph.service';

// declare jquery as any
declare var $: any;

@Component({
    selector: 'app-profit-graph',
    templateUrl: './profit-graph.component.html',
    styleUrls: ['./profit-graph.component.css']
})
export class ProfitGraphComponent implements OnInit {
  @ViewChild('chart') chartElementRef: ElementRef;

  data: DailyProfitGraphInterface[];
  daily = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  profit = ['30', '80', '210', '190', '280', '120', '0'];
  chart: Chart;

  constructor() { }

  private loadGraph() {
    /* this.dataSrc.results.forEach(y => {
      this.month.push(y.month);
      this.price.push(y.price);
    }); */

    this.chart = new Chart('dayilyCanvas', {
      type: 'line',
      data: {
        labels: this.daily,
        datasets: [
          {
            label: 'Profit amount',
            data: this.profit,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  ngOnInit() {

    // Load graph
    this.loadGraph();
  }

}
