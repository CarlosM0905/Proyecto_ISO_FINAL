import { Component, OnInit, ViewChild } from '@angular/core';
import { CertificationService } from 'src/app/services/certification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {df} from '../../files/pdfEmpresas'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface ITableFilter{
    column: string;
    value: any;
}

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.css']
})
export class CertificationListComponent implements OnInit {

  inputName = {column: "com_name",value: ""};
  inputAddress = {column: "com_address",value: ""};
  inputProvince = {column: "com_province",value: ""};
  inputCategory = {column: "com_category",value: ""};
  inputCertification = {column: "cer_name",value: ""}

  arrayInputs = [this.inputName, this.inputAddress, this.inputProvince, this.inputCategory, this.inputCertification];

  displayedColumns:string[] = ['nombre','direccion','provincia','categoria','cer_nombre','informacion','eliminar'];
  dataSource;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public certifications:any = [];
  public isos: any = [];
  public provinces: any = [];
  public categories: any = [];

  constructor(private certificationService: CertificationService, public modalInfo: MatDialog, private snackbar: MatSnackBar) { }

  customFilterPredicate(data: any, filters: ITableFilter[]):boolean{
    for(let i = 0; i< filters.length; i++){
      let fitsThisFilter;
      if( data[filters[i].column]){
        fitsThisFilter = data[filters[i].column].includes(filters[i].value);
      }
      if(!fitsThisFilter){
        return false;
      }
    }
    return true;
    }

  ngOnInit() {
    this.getCertifications();
    this.getISOS();
    this.getProvinces();
    this.getCategories();
  }

  async getCertifications(){
    await this.certificationService.getCertifications().subscribe(
      res => {
        this.certifications = res;
        console.log(this.certifications);
        this.dataSource = new MatTableDataSource(this.certifications.data);
        this.dataSource.filterPredicate = this.customFilterPredicate;
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  async getISOS(){
    await this.certificationService.getCertificationsByParameter('isos').subscribe(
      res => {
        this.isos = res;
        console.log(this.isos);
      },
      err => console.error(err)
    )
  }

  async getProvinces(){
    await this.certificationService.getCertificationsByParameter('provinces').subscribe(
      res => {
        this.provinces = res;
        console.log(this.provinces);
      },
      err => console.error(err)
    )
  }

  async getCategories(){
    await this.certificationService.getCertificationsByParameter('categories').subscribe(
      res => {
        this.categories = res;
        console.log(this.categories);
      },
      err => console.error(err)
    )
  }

   deleteCertification(row){
    this.certificationService.deleteCertification(row.cer_id, row.com_id).subscribe(
      res => {
        this.getCertifications();
        this.snackbar.open("¡Certificación eliminada correctamente!", "Cerrar", {
          horizontalPosition: "center",
          duration: 1000,
        });
      },
      err => console.log(err)
   )
  }

  aplicarFiltro(event){
    // let filter:string = "";
    // Object.values(this.allInputs).forEach((val)=>{
    //   filter += val;
    // });
    // console.log(filter)
    // if(event.target){
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    // }
    // else{
    //   let parametro: string = event.value;
    //   this.dataSource.filter = parametro.trim().toLowerCase();
    // }
    this.dataSource.filter = this.arrayInputs;
  }

  abrirModal(element: any): void {
    this.snackbar.open("¡Mostrando información!", "Cerrar", {
      horizontalPosition: "center",
      duration: 1000,
    });
    const modalRef = this.modalInfo.open(ModalInfoComponent,{
      width: '750px',
      height: '580px',
      data: element
    });

    modalRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    })
  }

  generatePdf(){
    let fechaActual: Date = new Date();
    let pdf = {...df};
    pdf.content[0]['text'] = `${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}`;
    this.dataSource.filteredData.forEach(element => {
      pdf.content[3]['table'].body.push(
        [
          {text: element.com_name, style: 'data'},
          {text: element.com_address , style: 'data'},
          {text: element.com_province , style: 'data'},
          {text: element.com_phone , style: 'data'},
          {text: element.cer_name, style: 'data'},
          {text: element.com_category, style: 'data'}
        ]
      )
    });
    console.log(pdf);
    pdfMake.createPdf(pdf).open();
    pdf.content[3]['table'].body.splice(1);
  }

}
