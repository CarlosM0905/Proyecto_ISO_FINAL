import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyListComponent } from './components/company-list/company-list.component';

import { CompaniesService } from './services/companies.service';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from './material/material.module'
import { DataSharingService } from './services/dataSharing.service';
import { ModalComponent } from './components/modal/modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { CertificationListComponent } from './components/certification-list/certification-list.component';
import { ListService } from './services/list.service';
import { CertificationService } from './services/certification.service';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CompanyFormComponent,
    CompanyListComponent,
    CompanyEditComponent,
    ModalComponent,
    CertificationListComponent,
    ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule
  ],
  entryComponents: [
    ModalComponent,
    ModalInfoComponent
  ],
  providers: [
    CompaniesService,
    DataSharingService,
    ListService,
    CertificationService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
