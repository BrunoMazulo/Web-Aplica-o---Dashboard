import { Component, OnInit,  ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BandejaxService } from 'src/app/services/bandejax.service';

@Component({
  selector: 'app-tratamento',
  templateUrl: './tratamento.component.html',
  styleUrls: ['./tratamento.component.css']
})
export class TratamentoComponent implements OnInit {

  displayedColumns = ['ordem','cemb','pn','ct','qtd','data_flx','est_flx','data_prog','data_saida','prio','aging_flx'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ordens_bdjx: any = [];
  ordens_total: any = [];
  resultlength: boolean;
  valor: any = [];
  ordens: any = [];

  constructor(private bandejaxService: BandejaxService) { }

  ngOnInit(): void {
    let heijunka = 'Conf';
    this.getBandejax(heijunka);
  }

  getBandejax(heijunka){
    const dados = this.ordens_bdjx;
    this.bandejaxService.getBandejax2(heijunka).subscribe(
      res => {
        this.ordens_total = res;

        const programadas = this.ordens_total.filter(
          ordens => ordens.Validacao == "OK"
        );
        this.ordens_bdjx = programadas;

        //this.ordens = this.ordens_bdjx.map(x => x.ordem);
        //console.log(this.ordens);
        this.dataSource = new MatTableDataSource(this.ordens_bdjx);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultlength = !this.resultlength;
      },
      err => console.error(err));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
