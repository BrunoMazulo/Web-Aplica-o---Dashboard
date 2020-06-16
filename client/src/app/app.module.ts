import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BandejaxComponent } from './components/bandejax/bandejax.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportsComponent } from './components/reports/reports.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { OnepageComponent } from './components/indicadores/onepage/onepage.component';
import { LunicaComponent } from './components/indicadores/lunica/lunica.component';
import { CorteComponent } from './components/bandejax/corte/corte.component';
import { TratamentoComponent } from './components/bandejax/tratamento/tratamento.component';
import { FilaComponent } from './components/fila/fila.component';


@NgModule({
  declarations: [
    AppComponent,
    BandejaxComponent,
    DashboardComponent,
    MainNavComponent,
    ReportsComponent,
    IndicadoresComponent,
    OnepageComponent,
    LunicaComponent,
    CorteComponent,
    TratamentoComponent,
    FilaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
