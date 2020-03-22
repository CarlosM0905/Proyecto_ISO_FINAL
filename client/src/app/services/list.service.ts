import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getListByParameter(parameter: string){
    return this.http.get(`${this.API_URI}/list/${parameter}`);
  }
}
