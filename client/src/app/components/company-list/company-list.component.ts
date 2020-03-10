import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models/Company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: any = [];
  company: Company = {
    com_name: "",
    com_address: "",
    com_category: "",
    com_province: "",
    com_phone: "",
  }

  constructor(private companiesService : CompaniesService) { }



  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.companiesService.getCompanies().subscribe(
      res => {
        this.companies = res;
        console.log(res);
      },
      err => console.error(err)
    );
  }

  deleteCompany(id: string){
    this.companiesService.deleteCompany(id).subscribe(
      res => {
        console.log(res);
        this.getCompanies();
      },
      err => console.log(err)
    );
    
  }

  searchCompanies(){
    console.log(this.company)
  }


}
