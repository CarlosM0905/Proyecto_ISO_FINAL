import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  
API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getCompanies(){
    return this.http.get(`${this.API_URI}/companies`);
  }

  getCompaniesByCategory(category: string){
    return this.http.get(`${this.API_URI}/companies/category/${category}`);
  }

  getCompaniesByProvince(province: string){
    return this.http.get(`${this.API_URI}/companies/province/${province}`)
  }

  getCompaniesByName(name: string){
    return this.http.get(`${this.API_URI}/companies/name/${name}`);
  }

  getCompaniesByAddress(address: string){
    return this.http.get(`${this.API_URI}/companies/address/${address}`);
  }

  getCompany(id: string){
    return this.http.get(`${this.API_URI}/companies/${id}`);
  }

  saveCompany(company: Company){
    return this.http.post(`${this.API_URI}/companies`,company);
  }

  deleteCompany(id: string){
    return this.http.delete(`${this.API_URI}/companies/${id}`);
  }

  updateCompany(id: string, updatedCompany: Company){
    return this.http.put(`${this.API_URI}/companies/${id}`,updatedCompany);
  }
}
