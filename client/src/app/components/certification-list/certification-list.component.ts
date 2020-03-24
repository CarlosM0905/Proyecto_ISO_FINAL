import { Component, OnInit, ViewChild } from '@angular/core';
import { CertificationService } from 'src/app/services/certification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ModalInfoComponent } from '../modal-info/modal-info.component';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.css']
})
export class CertificationListComponent implements OnInit {

  
  displayedColumns:string[] = ['nombre','provincia','telefono','categoria','cer_nombre','informacion','editar','eliminar'];
  dataSource;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public certifications:any = [];
  public isos: any = [];
  public provinces: any = [];
  public categories: any = [];

  constructor(private certificationService: CertificationService, public modalInfo: MatDialog) { }

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

  abrirModal(element: any): void {
    const modalRef = this.modalInfo.open(ModalInfoComponent,{
      width: '750px',
      height: '580px',
      data: element
    });

    modalRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    })
  }

}
