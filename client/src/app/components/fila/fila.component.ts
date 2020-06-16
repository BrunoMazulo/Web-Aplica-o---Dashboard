import { Component, OnInit } from '@angular/core';
import { FilaService } from 'src/app/services/fila.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit {


  LineChart=[];
  LineChart_aco=[];
  LineChart_revest=[];
  LineChart_perf=[];
  valores_fila: any = [];

  alum: any = [];
  corte: any = [];
  conf: any = [];
  plm: any = [];
  trat: any = [];

  aco: any = [];
  corte_aco: any = [];
  conf_aco: any = [];
  plm_aco: any = [];
  des_aco: any = [];

  
  revest: any = [];
  rev_conf: any = [];
  plm_b200: any = [];
  uq_5x: any = [];
  tt: any = [];

  perfis: any = [];
  perf: any = [];
  

  constructor(private filaservice: FilaService) { }

  ngOnInit(): void {
    this.get_values_fila();
  }

  get_values_fila(){
    this.filaservice.getFila().subscribe(
      res => {
        this.valores_fila = res;
        this.filter_linhas();
        this.grafico_aluminio();
        this.grafico_aco();
        this.grafico_revest();
        this.grafico_perfis();
      },
      err => console.error(err));
  }

  filter_linhas(){

    this.alum = this.valores_fila.filter(
      linha => linha.line == "Alumínio"
    );
    this.corte = this.alum.filter(
      hjk => hjk.heijunka == "Corte"
    )
    this.plm = this.alum.filter(
      hjk => hjk.heijunka == "Pulmão B01"
    )
    this.conf = this.alum.filter(
      hjk => hjk.heijunka == "Conformação"
    )
    this.trat = this.alum.filter(
      hjk => hjk.heijunka == "Trat. Sup e Pintura"
    )
      // Filtros do Aço
    this.aco = this.valores_fila.filter(
      linha => linha.line == "Aço"
    );
    this.corte_aco = this.aco.filter(
      hjk => hjk.heijunka == "Corte Aço"
    )
    this.plm_aco = this.aco.filter(
      hjk => hjk.heijunka == "Pulmão Aço"
    )
    this.conf_aco = this.aco.filter(
      hjk => hjk.heijunka == "Conf. Aço"
    )
    this.des_aco = this.aco.filter(
      hjk => hjk.heijunka == "Desemp. Aço"
    )
    // Filter Revestimentos B200
    this.revest = this.valores_fila.filter(
      linha => linha.line == "Revestimentos"
    );
    this.rev_conf = this.revest.filter(
      hjk => hjk.heijunka == "Rev. Conf"
    )
    this.plm_b200 = this.revest.filter(
      hjk => hjk.heijunka == "Pulmão B200"
    )
    this.uq_5x = this.revest.filter(
      hjk => hjk.heijunka == "UQ + 5x"
    )
    this.tt = this.revest.filter(
      hjk => hjk.heijunka == "TT"
    )
    // Filter Revestimentos B200
    this.perfis = this.valores_fila.filter(
      linha => linha.line == "Perfis"
    );
    this.perf = this.perfis.filter(
      hjk => hjk.heijunka == "Perfis"
    )
  }

  grafico_aluminio(){
    // Line chart:
    this.LineChart = new Chart('lineChart', {
     type: 'bar',
     data: {
         labels: this.corte.map(x => x.dateupdated.substr(0, 10)),
         datasets: [{
             label: 'Corte',
             backgroundColor: "#45c490",
             data: this.corte.map(x => Number(x.resultado)),
         }, {
             label: 'Pulmão',
             backgroundColor: "#008d93",
             data: this.plm.map(x => Number(x.resultado)),
         }, {
             label: 'Conformação',
             backgroundColor: "#2e5468",
             data: this.conf.map(x => Number(x.resultado)),
         }, {
            label: 'Trat Sup e Pint.',
            backgroundColor: "#2e5455",
            data: this.trat.map(x => Number(x.resultado)),
      }],
     },
 options: {
     title:{
       text:"Fila Alumínio",
       display:true
      },
     tooltips: {
       displayColors: true,
       callbacks:{
         mode: 'x',
       },
     },
     scales: {
       xAxes: [{
         stacked: true,
         gridLines: {
           display: false,
         }
       }],
       yAxes: [{
         stacked: true,
         ticks: {
           beginAtZero: true,
         },
         type: 'linear',
       }]
     },
         responsive: true,
         maintainAspectRatio: false,
         legend: { position: 'bottom' },
     }
 });}


 grafico_aco(){
  // Line chart:
  this.LineChart_aco = new Chart('lineChart2', {
   type: 'bar',
   data: {
       labels: this.corte_aco.map(x => x.dateupdated.substr(0, 10)),
       datasets: [{
           label: 'Corte Aço',
           backgroundColor: "#99d6e6",
           data: this.corte_aco.map(x => Number(x.resultado)),
       }, {
           label: 'Pulmão Aço',
           backgroundColor: "#45b4d4",
           data: this.plm_aco.map(x => Number(x.resultado)),
       }, {
           label: 'Conf. Aço',
           backgroundColor: "#548ea3",
           data: this.conf_aco.map(x => Number(x.resultado)),
       }, {
          label: 'Desemp. Aço',
          backgroundColor: "#1c4966",
          data: this.des_aco.map(x => Number(x.resultado)),
    }],
   },
options: {
   title:{
     text:"Fila Aço",
     display:true
    },
   tooltips: {
     displayColors: true,
     callbacks:{
       mode: 'x',
     },
   },
   scales: {
     xAxes: [{
       stacked: true,
       gridLines: {
         display: false,
       }
     }],
     yAxes: [{
       stacked: true,
       ticks: {
         beginAtZero: true,
       },
       type: 'linear',
     }]
   },
       responsive: true,
       maintainAspectRatio: false,
       legend: { position: 'bottom' },
   }
});}

grafico_revest(){
  // Line chart:
  this.LineChart_revest = new Chart('lineChart3', {
   type: 'bar',
   data: {
       labels: this.corte_aco.map(x => x.dateupdated.substr(0, 10)),
       datasets: [{
           label: 'Rev. Conf.',
           backgroundColor: "#99d6e6",
           data: this.rev_conf.map(x => Number(x.resultado)),
       }, {
           label: 'Pulmão B200',
           backgroundColor: "#45b4d4",
           data: this.plm_b200.map(x => Number(x.resultado)),
       }, {
           label: 'UQ + 5x',
           backgroundColor: "#548ea3",
           data: this.uq_5x.map(x => Number(x.resultado)),
       }, {
          label: 'TT',
          backgroundColor: "#1c4966",
          data: this.tt.map(x => Number(x.resultado)),
    }],
   },
options: {
   title:{
     text:"Fila Revestimento",
     display:true
    },
   tooltips: {
     displayColors: true,
     callbacks:{
       mode: 'x',
     },
   },
   scales: {
     xAxes: [{
       stacked: true,
       gridLines: {
         display: false,
       }
     }],
     yAxes: [{
       stacked: true,
       ticks: {
         beginAtZero: true,
       },
       type: 'linear',
     }]
   },
       responsive: true,
       maintainAspectRatio: false,
       legend: { position: 'bottom' },
   }
});}

grafico_perfis(){
  // Line chart:
  this.LineChart_perf = new Chart('lineChart4', {
   type: 'bar',
   data: {
       labels: this.corte_aco.map(x => x.dateupdated.substr(0, 10)),
       datasets: [{
          label: 'Perfis',
          backgroundColor: "#1c4966",
          data: this.perf.map(x => Number(x.resultado)),
    }],
   },
options: {
   title:{
     text:"Fila Perfis",
     display:true
    },
   tooltips: {
     displayColors: true,
     callbacks:{
       mode: 'x',
     },
   },
   scales: {
     xAxes: [{
       stacked: true,
       gridLines: {
         display: false,
       }
     }],
     yAxes: [{
       stacked: true,
       ticks: {
         beginAtZero: true,
       },
       type: 'linear',
     }]
   },
       responsive: true,
       maintainAspectRatio: false,
       legend: { position: 'bottom' },
   }
});}

}
