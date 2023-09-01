import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
  })
export class LineComponent implements AfterViewInit {
  @ViewChild('chartLine') chartLine!: ElementRef;

  ngAfterViewInit(): void {
    const ctx = this.chartLine.nativeElement.getContext('2d');
  
    const gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
    gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Mobile apps',
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: '#5e72e4',
          backgroundColor: gradientStroke1,
          fill: true,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { // Add title configuration here
            display: true,
            text: 'Mobile App Usage', // The title text
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          legend: {
            display: false,
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#fbfbfb',
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: '#ccc',
              padding: 20,
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  }
  
}
