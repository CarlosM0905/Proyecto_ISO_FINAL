import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { CompaniesService } from '../../services/companies.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company: any = {
    com_id: 0,
    com_name: '',
    com_address: '',
    com_province: '',
    com_category: '',
    com_phone: ''
  };
  id: string;

  constructor(private companiesService: CompaniesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany(){
    const params = this.activatedRoute.snapshot.params;
    this.id = params.id;
    if(this.id){
      this.companiesService.getCompany(this.id).subscribe(
        res => {
          this.company = res;
          console.log(res);
        },
        err => console.log(err)
        );
      }
    }

    updateCompany(){
      this.companiesService.updateCompany(this.id, this.company).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/empresas']);
        },
        err => console.log(err)
        );
      }
  
}
