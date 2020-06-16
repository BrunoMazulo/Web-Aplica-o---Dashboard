import { Component, OnInit, OnChanges } from '@angular/core';
import { faGlobe, faExclamationCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';
import {Chart} from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BandejaxService } from 'src/app/services/bandejax.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { areahjk } from 'src/app/models/areaheijunka';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  events: string[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    const teste:any = event.value;
    const dia_inc = teste.begin.getDate();
    const mes_inc = teste.begin.getMonth();
    const ano_inc = teste.begin.getFullYear();
    console.log(dia_inc);
    console.log(mes_inc + 1);
    console.log(ano_inc);
    const dia_end = teste.end.getDate();
    const mes_end = teste.end.getMonth();
    const ano_end = teste.end.getFullYear();
    console.log(dia_end);
    console.log(mes_end + 1);
    console.log(ano_end + '-' + mes_end + '-' + dia_end);
    //console.log(teste.begin);
    //console.log(teste.end);
  }

  selectedValue: string;
  heij = [
    {value: 'Cort', viewValue: 'Corte'},
    {value: 'Conf', viewValue: 'Conformação'},
    {value: 'Trat', viewValue: 'Tratamento e Pintura'}
  ];
  
  hjkvalue: areahjk;
  selectedheij: string;

  faGlobe = faGlobe;
  faExclamationCircle = faExclamationCircle;
  faChartBar = faChartBar;

  title = 'Ng7ChartJs By DotNet Techy';
  LineChart=[];
  LineChart2=[];
  indicador: any = [];
  indicador_ops_atrasadas: any = [];
  dataind: any = [];
  values: any = [];
  ops_bdjx: any = [];
  mparadas: Number;
  zppe: Number;
  agingflx: Number;
  agingprog: Number;
  ult_hjk: Number;

  constructor(private dashboardService: DashboardService, private bandejaxService: BandejaxService) { }

  ngOnInit(): void {
      let heijunka = 'Conf';
      this.getIndicador();
      this.getbandejax(heijunka);
      this.get_ops_atrasadas(heijunka);
  }

  
  getIndicador(){
    const dados = this.indicador;
    this.dashboardService.getIndHeijunka().subscribe(
      res => {
        this.indicador = res;
        //this.dataind = this.indicador.map(x => x.Resultado);
        this.plotgraphone();
        this.ultreshjk();
      },
      err => console.error(err));
  }

  getIndicadorunico(event){

    const value = event;

    this.dashboardService.getIndHeijunico(value).subscribe(
      res => {
        this.indicador = res;
        this.updatechartnew(this.LineChart, value);
        this.ultreshjk();
        this.Opsatrasadas(event);
        this.getbandejax(value);
      },
      err => console.error(err));
    
  }

  Opsatrasadas(event){

    const areahjk = event;
    
    this.dashboardService.getOpsatrasadas(areahjk).subscribe(
      res => {
        this.indicador_ops_atrasadas = res;
        this.updatechart2(this.LineChart2, areahjk);
        
        //this.ultreshjk();
      },
      err => console.error(err));
  
    }

  updatechartnew(Chart, value){

      // Para definir novo titulo para o gráfico do heijunka
      if (value === 'Cort'){
        this.title = "Atendimento ao Heijunka - Corte";
        //console.log(this.title);
    } else if (value === 'Conf'){
        this.title = "Atendimento ao Heijunka - Conformação";
    } else if (value === 'Trat'){
        this.title = "Atendimento ao Heijunka - Tratamento & Pintura";
    }

      Chart.options.title.text = this.title;
      Chart.data.labels =  this.indicador.map(x => x.Data);
      Chart.data =  {
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
      data: [80,80 , 80, 80, 80, 80,80,80,80,80,80,80,80,80,80,80,80,80],
      fill:true,
      lineTension:0.1,
      borderColor:"red",
      backgroundColor: "rgba(247, 190, 204, 0.959)",
      borderWidth: 0.1
    },
    {
      label: 'Meta Superior',
      data: [100,100 , 100, 100, 100, 100,100,100,100,100,100,100,100,100,100,100,100,100],
      fill:true,
      lineTension:0.1,
      borderColor:"green",
      backgroundColor: "rgba(190, 247, 193, 0.959)",
      borderWidth: 0.1
    }
    ]}
        Chart.update();
  }

  updatechart2(Chart, value){

    // Para definir novo titulo para o gráfico de Ops atrasadas heijunka
    if (value === 'Cort'){
      this.title = "Ops Atrasadas - Corte";
  } else if (value === 'Conf'){
      this.title = "Ops Atrasadas - Conformação";
  } else if (value === 'Trat'){
      this.title = "Ops Atrasadas - Tratamento & Pintura";
  }

    Chart.options.title.text = this.title;
    Chart.data.labels =  this.indicador_ops_atrasadas.map(x => x.data_saida.substr(0, 10));
    Chart.data =  {
      labels:  this.indicador_ops_atrasadas.map(x => x.data_saida.substr(0, 10)),
      datasets: [{
      label: 'Qtd_Ordens',
      data: this.indicador_ops_atrasadas.map(x => Number(x.Qtd_Ops)),
      fill:false,
      lineTension:0,
      backgroundColor: "blue",
      hoverBackgroundColor: "red",
      borderWidth: 3
  }
  ]}
      Chart.update();
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
    data: [80,80 , 80, 80, 80, 80,80,80,80,80,80,80,80,80,80,80,80,80],
    fill:true,
    lineTension:0.1,
    borderColor:"red",
    backgroundColor: "rgba(247, 190, 204, 0.959)",
    borderWidth: 0.1
  },
  {
    label: 'Meta Superior',
    data: [100,100 , 100, 100, 100, 100,100,100,100,100,100,100,100,100,100,100],
    fill:true,
    lineTension:0.1,
    borderColor:"green",
    backgroundColor: "rgba(190, 247, 193, 0.959)",
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

  plotgraphtwo(){
     // Line chart:
     this.LineChart2 = new Chart('lineChart2', {
      type: 'bar',
    data: {
    labels: this.indicador_ops_atrasadas.map(x => x.data_saida.substr(0, 10)),
    datasets: [{
        label: 'Qtd_Ordens',
        data: this.indicador_ops_atrasadas.map(x => Number(x.Qtd_Ops)),
        fill:false,
        lineTension:0,
        backgroundColor: "blue",
        hoverBackgroundColor: "red",
        borderWidth: 3
    }]
    }, 
    options: {
    title:{
        text:"OP's atrasadas - Heijunka",
        display:true
    },
    legend: {
      display: false
    },
    scales: {
        yAxes: [{
            ticks: {
              beginAtZero:true
            },
            gridLines: {
              drawOnChartArea: false},
        }]
    }
    }
    });
  }

  get_ops_atrasadas(heijunka){
    
    const value = heijunka;
    this.dashboardService.getOpsatrasadas(value).subscribe(
      res => {
        this.indicador_ops_atrasadas = res;
        this.plotgraphtwo();
        
      },
      err => console.error(err));    
  }

  getbandejax(heijunka){
    const value = heijunka;
    this.bandejaxService.getBandejax2(value).subscribe(
      res => {
        this.ops_bdjx = res;
        console.log(this.ops_bdjx);
        this.montagensparadas()
        this.pecaespecial()
        this.agingmax()
    })
  }

  montagensparadas(){
    const mps = this.ops_bdjx.filter(
      ordens => ordens.prior == "MONTAGEM PARADA (S)"
    );
    this.mparadas = mps.length;
  }

  pecaespecial(){
    const nzppe = this.ops_bdjx.filter(
      ordens => ordens.tipo_op == "ZPPE"
    );
    this.zppe = nzppe.length;
  }

  ultreshjk(){
    const ult = this.indicador.slice(-1)[0];
    this.ult_hjk =  ult.Resultado * 100;
    console.log(ult);
  }

  agingmax(){
    const agmaxfluxo = this.ops_bdjx.map(x => Number(x.aging_flx))
    const prog = this.ops_bdjx.filter( ordens => ordens.Validacao == "OK");
    const agmaxprog = prog.map(x => Number(x.aging_flx));
    this.agingprog= Math.min.apply(Math,  agmaxprog);
    this.agingflx = Math.min.apply(Math,  agmaxfluxo);
  }
}
