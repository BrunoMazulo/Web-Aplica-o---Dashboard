import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BandejaxComponent } from './components/bandejax/bandejax.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CorteComponent } from './components/bandejax/corte/corte.component';
import { TratamentoComponent } from './components/bandejax/tratamento/tratamento.component';
import { FilaComponent } from './components/fila/fila.component';
import { OnepageComponent } from './components/indicadores/onepage/onepage.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:'/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'bandejax/conformacao', component: BandejaxComponent
  },
  {
    path: 'bandejax/corte', component: CorteComponent
  },
  {
    path: 'bandejax/tratamento', component: TratamentoComponent
  },
  {
    path: 'relatorios', component: ReportsComponent
  },
  {
    path: 'fila', component: FilaComponent
  },
  {
    path: 'indicadores/onepage', component: OnepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
