import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BandejaxComponent } from './components/bandejax/bandejax.component';


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
    path: 'bandejax', component: BandejaxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
