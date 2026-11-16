import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.css']
})
export class ChartDoughnutComponent {
  ngOnInit() {
    const cricleChart= {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [200, 80, 120],
        backgroundColor: [
          'rgba(255, 92, 0, 1)',
          'rgba(14, 138, 116, 0.5)',
          '#0e8a74',
        ],
        hoverOffset: 4
      }]
    };
    new Chart('doughnut-chart', {
      type: 'doughnut',
      data: cricleChart,
    });
  }
}
