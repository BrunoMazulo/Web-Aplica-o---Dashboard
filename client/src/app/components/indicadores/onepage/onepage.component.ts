import { Component, OnInit } from '@angular/core';
import { FilaService } from 'src/app/services/fila.service';
import {Chart} from 'chart.js';
import { OnepagereportService } from 'src/app/services/onepagereport.service';

@Component({
  selector: 'app-onepage',
  templateUrl: './onepage.component.html',
  styleUrls: ['./onepage.component.css']
})
export class OnepageComponent implements OnInit {

  /* Fila */
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
  /* Fila */

  // Aderencia
  ader: any = [];
  LineChart_ader=[];
  adr_N: any = [];
  adr_B: any = [];
  adr_Q: any = [];
  adr_Total: any = [];
  // Fim - Aderencia

  LineChart_hjkb1=[];
  hjk: any = [];
  hjk_cort: any = [];
  hjk_maq: any = [];
  hjk_conf: any = [];
  hjk_solda: any = [];
  hjk_usin: any = [];
  hjk_trat: any = [];

  constructor(private filaservice: FilaService, private ongepagereportservice: OnepagereportService) { }

  ngOnInit(): void {
    this.get_values_fila();
    this.get_kpi_values();
    this.get_kpi_heijunka();

  }

  get_kpi_heijunka(){
    const kpi: string = "hjk"
    this.ongepagereportservice.getKPI(kpi).subscribe(
      res => {
        this.hjk = res;
        this.filter_hjk();
        
      },
      err => console.error(err));
  }

  filter_hjk(){

    
    this.hjk = this.hjk.slice(-30); // Pega os ultimos 30 valores do array (6 linha por dia)
    this.hjk_cort = this.hjk.slice(0,6);
    this.hjk_maq = this.hjk.slice(24,30);
    this.hjk_conf = this.hjk.slice(6,12);
    this.hjk_solda = this.hjk.slice(12,18);
    this.hjk_usin = this.hjk.slice(18,24);
    const d1: string = this.hjk_cort.slice(0);
    console.log(this.hjk_cort[0].Data);   
    //this.hjk_cort = this.hjk.filter( result => result.Data == "28/4/2020")
    // this.hjk_maq = this.hjk.filter( result => result.Data == "29/4/2020")
    // this.hjk_conf = this.hjk.filter( result => result.area_heijunka == "2 - Conforma")
    // this.hjk_solda = this.hjk.filter( result => result.area_heijunka == "2 - Solda")
    // this.hjk_usin = this.hjk.filter( result => result.area_heijunka == "2 - Usinagem")
    // this.hjk_trat = this.hjk.filter( result => result.area_heijunka == "3 - Trat. Su")
    this.grafico_heijunkaB01();
    //const teste = this.hjk.sort();
    //console.log(teste);
  }

  grafico_heijunkaB01(){
    // Line chart:
    this.LineChart_hjkb1 = new Chart('lineChart6', {
     type: 'bar',
   data: {
   labels:['Corte','Conformação','Solda', 'Usinagem', 'Trat. Sup e Pintura','Máquinas'],
   datasets: [{
       label: this.hjk_cort[0].Data,
       data: this.hjk_cort.map(x => Number(x.Resultado)*100),
       fill:false,
       lineTension:0,
       backgroundColor: "#1c4966",
    },
    {
      label: this.hjk_conf[0].Data,
      data: this.hjk_conf.map(x => Number(x.Resultado)*100),
      fill:false,
      lineTension:0,
      backgroundColor: "#1c4966",
    },
    {
      label: this.hjk_solda[0].Data,
      data: this.hjk_solda.map(x => Number(x.Resultado)*100),
      fill:false,
      lineTension:0,
      backgroundColor: "#1c4966",
    },
    {
      label: this.hjk_usin[0].Data,
      data: this.hjk_usin.map(x => Number(x.Resultado)*100),
      fill:false,
      lineTension:0,
      backgroundColor: "#1c4966",
    },
    {
      label: this.hjk_maq[0].Data,
      data: this.hjk_maq.map(x => Number(x.Resultado)*100),
      fill:false,
      lineTension:0,
      backgroundColor: "#1c4966",
    }]
   },
   options: {
   title:{
       text:"Atendimento ao Heijunka - B01",
       display:true
   },
   legend: {
     display: true,
     position: 'bottom'
   },
   scales: {
       yAxes: [{
           ticks: {
             beginAtZero:false
           },
           gridLines: {
             drawOnChartArea: false},
       }]
   },
        responsive: true,
        maintainAspectRatio: false,
   }
   });
 }

  get_kpi_values(){
    const kpi: string = "ader"
    this.ongepagereportservice.getKPI(kpi).subscribe(
      res => {
        this.ader = res;
        console.log(this.ader);
        this.filter_aderencia();
        
      },
      err => console.error(err));
  }

  filter_aderencia(){

    this.adr_N = this.ader.filter(
      plan => plan.plnmrp == "N"
    );
    console.log(this.adr_N);
    this.adr_B = this.ader.filter(
      plan => plan.plnmrp == "B"
    );
    this.adr_Q = this.ader.filter(
      plan => plan.plnmrp == "Q"
    );
    this.adr_Total = this.ader.filter(
      plan => plan.plnmrp == "Total"
    );
    this.grafico_aderencia();
  }

  grafico_aderencia(){
    // Line chart:
    this.LineChart_ader = new Chart('lineChart5', {
     type: 'bar',
   data: {
   labels: this.adr_B.map(x => x.date_updated.substr(0, 10)),
   datasets: [{
       label: 'B',
       data: this.adr_B.map(x => Number(x.resultado)),
       fill:false,
       lineTension:0,
       backgroundColor: "#1c4966",
   },{
      label: 'N',
      data: this.adr_N.map(x => Number(x.resultado)),
      fill:false,
      lineTension:0,
      backgroundColor: "#5281a3",
    },{
      label: 'Q',
      data: this.adr_Q.map(x => Number(x.resultado)),
      fill:false,
      lineTension:0,
      backgroundColor: "#5da0cf",
  },
  {
    label: 'Total',
    data: this.adr_Total.map(x => Number(x.resultado)),
    fill:false,
    lineTension:0,
    backgroundColor: "#96ccf3",
  }]
   }, 
   options: {
   title:{
       text:"Aderência as Politicas de Estoque",
       display:true
   },
   legend: {
     display: true,
     position: 'bottom'
   },
   scales: {
       yAxes: [{
           ticks: {
             beginAtZero:false
           },
           gridLines: {
             drawOnChartArea: false},
       }]
   },
        responsive: true,
        maintainAspectRatio: false,
   }
   });
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
    this.LineChart = new Chart('lineChart', 
    {
     type: 'bar',
     data: {
         labels: this.corte.map(x => x.dateupdated.substr(0, 10)),
         datasets: [
          {
            type: 'line',
            label: 'Meta',
            backgroundColor: "red",
            borderColor: 'red',
            data: [7,7,7,7,7,7,7,7],
            pointStyle: 'line',
            fill: false,
            offset: false,
          },{
             label: 'Corte',
             backgroundColor: "#1c4966",
             data: this.corte.map(x => Number(x.resultado)),
         }, {
             label: 'Pulmão',
             backgroundColor: "#5281a3",
             data: this.plm.map(x => Number(x.resultado)),
         }, {
             label: 'Conformação',
             backgroundColor: "#5da0cf",
             data: this.conf.map(x => Number(x.resultado)),
         }, {
            label: 'Trat Sup e Pint.',
            backgroundColor: "#96ccf3",
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
});
}

}
