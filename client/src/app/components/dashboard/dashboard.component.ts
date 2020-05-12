import { Component, OnInit } from '@angular/core';
import { faGlobe, faExclamationCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';
import {Chart} from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faGlobe = faGlobe;
  faExclamationCircle = faExclamationCircle;
  faChartBar = faChartBar;

  title = 'Ng7ChartJs By DotNet Techy';
  LineChart=[];
  LineChart2=[];
  indicador: any = [];
  dataind: any = [];
  values: any = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
      this.getIndicador();
      
     // Line chart:
       

             // Line chart:
             this.LineChart = new Chart('lineChart2', {
              type: 'line',
            data: {
            labels: ["27/04", "28/04", "29/04", "30/04", "01/05", "04/05","05/05","06/05","07/05","08/05","11/05","12/05"],
            datasets: [{
                label: 'Resultado',
                data: [82,95 , 92, 85, 97, 100,85,76,79,63,51,89],
                fill:false,
                lineTension:0,
                borderColor:"black",
                borderWidth: 3
            },
          {
            label: 'Meta Inferior',
            data: [90,90 , 90, 90, 90, 90,90,90,90,90,90,90],
            fill:true,
            lineTension:0.1,
            borderColor:"red",
            backgroundColor: "rgba(248, 164, 171, 0.959)",
            borderWidth: 0.1
          },
          {
            label: 'Meta Superior',
            data: [100,100 , 100, 100, 100, 100,100,100,100,100,100,100],
            fill:true,
            lineTension:0.1,
            borderColor:"green",
            backgroundColor: "rgba(111, 233, 95, 0.959)",
            borderWidth: 0.1
          }]
            }, 
            options: {
            title:{
                text:"Atendimento ao Heijunka",
                display:true
            },
            legend: {
              display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            }
            }
            });
        
  }

  getIndicador(){
    const dados = this.indicador;
    this.dashboardService.getIndHeijunka().subscribe(
      res => {
        this.indicador = res;
        //this.dataind = this.indicador.map(x => x.Data);
        this.dataind = this.indicador.map(x => x.Resultado);
        this.dataind = this.indicador.map(x => Number(x.Ops_nao_feitas) / 10);
        //console.log(this.dataind);
        this.plotgraphone();
      },
      err => console.error(err));
  }

  plotgraphone(){
    this.LineChart = new Chart('lineChart', {
      type: 'line',
    data: {
    labels:  this.indicador.map(x => x.Data),
    datasets: [{
        label: 'Resultado',
        data: this.indicador.map(x => Number(x.Resultado)* 100),
        fill:false,
        lineTension:0,
        borderColor:"black",
        borderWidth: 3
    },
  {
    label: 'Meta Inferior',
    data: [80,80 , 80, 80, 80, 80,80,80,80,80,80,80,80,80,80,80],
    fill:true,
    lineTension:0.1,
    borderColor:"red",
    backgroundColor: "rgba(248, 164, 171, 0.959)",
    borderWidth: 0.1
  },
  {
    label: 'Meta Superior',
    data: [100,100 , 100, 100, 100, 100,100,100,100,100,100,100,100,100,100,100],
    fill:true,
    lineTension:0.1,
    borderColor:"green",
    backgroundColor: "rgba(111, 233, 95, 0.959)",
    borderWidth: 0.1
  }]
    }, 
    options: {
    title:{
        text:"Atendimento ao Heijunka - Conformação",
        display:true
    },
    legend: {
      display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:false
            }
        }]
    }
    }
    });
  }

}
