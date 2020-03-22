import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import {ListService} from '../../services/list.service'
import {Company } from '../../models/Company';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {dd} from '../../files/pdfEmpresas'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  displayedColumns:string[] = ['nombre','direccion','provincia','telefono','categoria','editar','eliminar'];
  dataSource;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private companiesService : CompaniesService, private listService: ListService) {
    
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
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }


  
  deleteCompany(id: string){
    this.companiesService.deleteCompany(id).subscribe(
      res => {
        this.getCompanies();
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
          element.com_name,
          element.com_address,
          element.com_province,
          element.com_phone,
          element.com_category
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
    if(event.target){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    else{
      let parametro: string = event.value;
      this.dataSource.filter = parametro.trim().toLowerCase();
    }
  }
  

}
