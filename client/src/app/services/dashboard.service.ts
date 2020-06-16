import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { areahjk } from '../models/areaheijunka';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URI = 'http://localhost:3000/';

  constructor(private HttpClient: HttpClient) { }

getIndHeijunka(){
  return this.HttpClient.get(`${this.API_URI}`);
}

getIndHeijunico(areahjk: string){
  return this.HttpClient.get(`${this.API_URI}${areahjk}`);
}

getOpsatrasadas(areahjk: string){
  return this.HttpClient.get(`${this.API_URI}ops/${areahjk}`);
}

}
