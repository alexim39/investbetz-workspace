import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Chart } from 'chart.js';
import { MonthlyProfitGraphInterface } from './monthly-profit-graph.service';

// declare jquery as any
declare var $: any;


@Component({
    selector: 'app-monthly-profit-graph',
    templateUrl: './monthly-profit-graph.component.html',
    styleUrls: ['./monthly-profit-graph.component.css']
})
export class MonthlyProfitGraphComponent implements OnInit {
  @ViewChild('chart') chartElementRef: ElementRef;

  data: MonthlyProfitGraphInterface[];
  month = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  profit = ['180', '200', '210', '190', '280', '230'];
  chart: Chart;

 /*  dataSrc = {
    'results': [
      {
        'month': 'Jan',
        'price': '180'
      },
      {
        'month': 'Feb',
        'price': '200'
      },
      {
        'month': 'March',
        'price': '210'
      },
      {
        'month': 'April',
        'price': '190'
      },
      {
        'month': 'May',
        'price': '280'
      },
      {
        'month': 'June',
        'price': '230'
      }
    ]
  }; */

  constructor() { }

  private loadGraph() {
    /* this.dataSrc.results.forEach(y => {
      this.month.push(y.month);
      this.price.push(y.price);
    }); */

    this.chart = new Chart('monthlyCanvas', {
      type: 'line',
      data: {
        labels: this.month,
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
