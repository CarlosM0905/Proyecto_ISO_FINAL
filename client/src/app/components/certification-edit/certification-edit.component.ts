import { Component, OnInit } from '@angular/core';
import { CertificationService } from 'src/app/services/certification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-certification-edit',
  templateUrl: './certification-edit.component.html',
  styleUrls: ['./certification-edit.component.css']
})
export class CertificationEditComponent implements OnInit {

  id: string;
  company: any = {
    com_id: 0,
    com_name: '',
    com_address: '',
    com_province: '',
    com_category: '',
    com_phone: ''
  };
  originalCertifications: any = [];
  certifications: any = [];
  allCertifications: any = [];

  constructor(private certificationService: CertificationService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCompanyWithCertifications();
    this.getAllCertifications();
  }

   getCompanyWithCertifications() {
    this.certifications = [];
    let response;
    const params = this.activatedRoute.snapshot.params;
    this.id = params.id;
    if (this.id) {
      this.certificationService.getCertificationsById(this.id).subscribe(
        res => {
          response = res;

          this.company.com_id = response.data[0].com_id;
          this.company.com_name = response.data[0].com_name;
          this.company.com_address = response.data[0].com_address;
          this.company.com_province = response.data[0].com_province;
          this.company.com_phone = response.data[0].com_phone;
          this.company.com_category = response.data[0].com_category;

          response.data.forEach(element => {
            this.certifications.push(
              {
                cer_id: element.cer_id,
                cer_name: element.cer_name,
                cer_description: element.cer_description
              }
            )
          });

          this.originalCertifications = this.certifications.slice();
          console.log(this.company);
          console.log(this.certifications);
          console.log(this.originalCertifications);
        },
        err => console.log(err)
      );
    }
   
  }

  async getAllCertifications(){
    let response;
     await this.certificationService.getCertificationsByParameter('isos').subscribe(
      res=> {
        response = res;
        this.certifications.forEach((element) => {
          response.data.forEach((iso, index) => {
            if(iso.cer_id == element.cer_id){
              console.log(iso.cer_id == element.cer_id);
              response.data.splice(index,1);
            }
          });
        });
        this.allCertifications = response.data;
        console.log(this.allCertifications);
      },
      err => console.log(err)
    )
  }

  moverISO(iso: any){
    console.log(iso);
    let indexLeft = this.certifications.indexOf(iso);
    let indexRight = this.allCertifications.indexOf(iso);
    console.log(this.allCertifications.indexOf(iso));
    console.log(this.certifications.indexOf(iso));

    if(indexLeft == -1){
      this.certifications.push(iso);
      this.allCertifications.splice(indexRight,1);
    }
    if(indexRight == -1){
      this.allCertifications.push(iso);
      this.certifications.splice(indexLeft,1);
    }
    console.log("Data a enviar",this.certifications);
    console.log("Data original", this.originalCertifications);
  }

  guardarCambios(){
    let dataToSend:any=[];
    let originalData: any= [];

    console.log(this.certifications);
    console.log(this.company);

    this.originalCertifications.forEach(oCertification =>{
      originalData.push([this.company.com_id, oCertification.cer_id]);
    })

    this.certifications.forEach(certification =>{
      dataToSend.push([this.company.com_id, certification.cer_id]);
    })
    // Data a enviar
   let body = {
    data: dataToSend,
    original_data: originalData
   }

    this.certificationService.updateCertificationOfCompany(body).subscribe(
      res => {
        // this.router.navigate(['/']);
        console.log(res);
      },
      err => console.log(err)
    )
  }

 
}
