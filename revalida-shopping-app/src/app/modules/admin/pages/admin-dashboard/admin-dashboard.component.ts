import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { DataTable } from 'simple-datatables';  

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('datatablesSimple', { static: false }) datatablesSimple!: ElementRef;
  // @ViewChild('areaChartCanvas', { static: false}) areaChartCanvas!: ElementRef;

  constructor() {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

  }

  ngOnInit(): void {
      // Access the sidebarToggle button
      const sidebarToggle = document.querySelector('#sidebarToggle') as HTMLElement;

      if(sidebarToggle) {
          // Uncomment the following block to persist sidebar toggle between refreshes
          // if(localStorage.getItem('sb|sidebar-toggle') === 'true') {
          //   document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
          // }

          sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            // Toggle the class to show/hide sidebar
            document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
            // Persist the state in localStorage
            localStorage.setItem('sb|sidebar-toggle', document.querySelector('.sb-nav-fixed')?.classList.contains('sb-sidenav-toggled').toString() as string);
          })
      }
  }

  ngAfterViewInit(): void {
      // Create the necessary charts
      this.createAreaChart();
      this.createBarChart();

      // Create datatables 
      // We could use grid.js for this once we pull data from db
      // https://gridjs.io/docs/examples/search
      console.log(this.datatablesSimple);
      if(this.datatablesSimple) {
        new DataTable(this.datatablesSimple.nativeElement, {
          searchable: true
        });
      }
  }

  createAreaChart(): void {   

      const ctx = document.getElementById("myAreaChart") as HTMLCanvasElement;
      console.log(ctx);
      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
          datasets: [{
            label: "Sessions",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 40000,
                maxTicksLimit: 5
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
              }
            }],
          },
          legend: {
            display: false
          }
        }
      };
      
      // Load the configuration to the canvas
      new Chart(ctx, config);
  }

  createBarChart(): void {
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    // Bar Chart Example
    const ctx = document.getElementById("myBarChart") as HTMLCanvasElement;
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
          label: "Revenue",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: [4215, 5312, 6251, 7841, 9821, 14984],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 15000,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    };

    // Load the configuration to the canvas
    new Chart(ctx, config);
  }
}
