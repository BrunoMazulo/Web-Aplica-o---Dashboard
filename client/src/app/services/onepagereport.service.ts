import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnepagereportService {
  API_URI = 'http://localhost:3000/api/opage';

  constructor(private HttpClient: HttpClient) { }

  getKPI(kpi: string){
    return this.HttpClient.get(`${this.API_URI}/${kpi}`);
  }

}
