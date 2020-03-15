import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../../models/Company';
import { CompaniesService } from '../../services/companies.service'
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog'
import { ModalComponent } from '../modal/modal.component'

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit, OnDestroy {

  company: Company = {
    com_id: 0,
    com_name: '',
    com_address: '',
    com_province: '',
    com_category: '',
    com_phone: ''
  };

  constructor(private companiesService: CompaniesService, private router: Router, public modal: MatDialog) { }
  

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log("Componente agregar destruido")
  }

  async saveNewCompany(){
    await this.companiesService.saveCompany(this.company).subscribe(
      res=>{
        console.log(res);
      },
      err => console.error(err)
    
    )
    // Se abre el modal para confirmar el guardado
    const modalRef = this.modal.open(
      ModalComponent, {
        data: {
          title: "¡Exito!",
          message: "La empresa se guardo correctamente"
        }
      } 
    );

    modalRef.afterClosed().subscribe(result=>{
      console.log('El modal fue cerrado');
    })
  }

}
