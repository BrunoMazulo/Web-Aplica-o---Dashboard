import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilaService {
  API_URI = 'http://localhost:3000/api';

  constructor(private HttpClient: HttpClient) { }

  getFila(){
    return this.HttpClient.get(`${this.API_URI}/fila`);
  }

}
