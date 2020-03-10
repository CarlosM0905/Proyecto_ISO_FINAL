import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { CompaniesService } from '../../services/companies.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  company: Company = {
    com_id: 0,
    com_name: '',
    com_address: '',
    com_province: '',
    com_category: '',
    com_phone: ''
  };

  constructor(private companiesService: CompaniesService, private router: Router) { }

  ngOnInit() {
  }

  saveNewCompany(){
    this.companiesService.saveCompany(this.company).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/empresas']);
      },
      err => console.error(err)
    )
  }

}
