import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import {ListService} from '../../services/list.service'
import {Company } from '../../models/Company';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {dd} from '../../files/pdfEmpresas'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface ITableFilter{
  column: string;
  value: any;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  provinces: any =[];
  categories: any = [];
  companies: any = [];
  company: Company = {
    com_name: "",
    com_address: "",
    com_category: "",
    com_province: "",
    com_phone: "",
  }

  inputName = {column:"com_name", value: ""};
  inputAddress = {column: "com_address", value: ""};
  inputProvince = {column: "com_province", value: ""};
  inputCategory = {column: "com_category", value: ""};
  inputPhone = {column: "com_phone", value: ""};

  arrayInputs = [this.inputName, this.inputAddress, this.inputProvince, this.inputCategory, this.inputPhone];

  displayedColumns:string[] = ['nombre','direccion','provincia','telefono','categoria','editar','eliminar'];
  dataSource;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private companiesService : CompaniesService, private listService: ListService, private snackbar: MatSnackBar) {
    
   }
  
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
    this.getCompanies();
    this.getCategories();
    this.getProvinces();
  }

  async getCategories(){
    await this.listService.getListByParameter('categories').subscribe(
      res => {
        this.categories = res;
        console.log(this.categories.message);
      }
    )
  }

  async getProvinces(){
    await this.listService.getListByParameter('provinces').subscribe(
      res => {
        this.provinces = res;
        console.log(this.provinces.message);
      }
    )
  }

  async getCompanies(){
    await this.companiesService.getCompanies().subscribe(
      res => {
        this.companies = res;
        this.dataSource = new MatTableDataSource(this.companies);
        this.dataSource.filterPredicate = this.customFilterPredicate;
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }


  
  deleteCompany(id: string){
    this.companiesService.deleteCompany(id).subscribe(
      res => {
        this.getCompanies();
        this.snackbar.open("¡Empresa eliminada correctamente!", "Cerrar", {
          horizontalPosition: "center",
          duration: 1000,
        });
      },
      err => console.log(err)
    );
    
  }

  generatePdf(){
    let fechaActual: Date = new Date();
    let pdf = {...dd};
    pdf.content[0]['text'] = `${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}`;
    this.dataSource.filteredData.forEach(element => {
      pdf.content[3]['table'].body.push(
        [
          {text: element.com_name, style: 'data'},
          {text: element.com_address , style: 'data'},
          {text: element.com_province , style: 'data'},
          {text: element.com_phone , style: 'data'},
          {text: element.com_category, style: 'data'}
        ]
      )
    });
    pdfMake.createPdf(pdf).open();
    pdf.content[3]['table'].body.splice(1);
  }

  ngOnDestroy(): void {
    console.log("Componente listar destruido")
  }
  
  aplicarFiltro(event){
    console.log(this.arrayInputs);
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
  

}
