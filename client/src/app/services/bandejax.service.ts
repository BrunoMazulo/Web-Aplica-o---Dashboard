import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandejaxService {
  API_URI = 'http://localhost:3000/api';
  
  constructor(private HttpClient: HttpClient) { }
  
  getBandejax(){
    return this.HttpClient.get(`${this.API_URI}/bandejax`);
  }
  
}
