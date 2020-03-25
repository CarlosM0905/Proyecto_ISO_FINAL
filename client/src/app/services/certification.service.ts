import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  API_URI = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getCertifications(){
    return this.http.get(`${this.API_URI}/certification`);
  }

  getCertificationsByParameter(parameter: string){
    return this.http.get(`${this.API_URI}/certification/${parameter}`);
  }

  getCertificationsById(id: string){
    return this.http.get(`${this.API_URI}/certification/list/${id}`);
  }

  updateCertificationOfCompany(data: any){
    return this.http.post(`${this.API_URI}/certification/`,data);
  }

  deleteCertification(cer_id: number, com_id:number){
    return this.http.delete(`${this.API_URI}/certification/${cer_id}/${com_id}`);
  }
}
