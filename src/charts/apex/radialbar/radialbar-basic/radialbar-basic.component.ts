import { Component } from '@angular/core';

@Component({
  selector: 'app-radialbar-basic',
  templateUrl: './radialbar-basic.component.html',
  styleUrls: ['./radialbar-basic.component.css']
})
export class RadialbarBasicComponent {
  chartOptions = {
    series: [70],
    chart: {
      height: 350,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%"
        }
      }
    },
    colors:["var(--primary)"],
    labels: ["Cricket"]
  };
}
