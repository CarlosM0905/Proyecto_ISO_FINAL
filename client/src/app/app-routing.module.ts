import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CertificationListComponent } from './components/certification-list/certification-list.component';
import { CertificationEditComponent } from './components/certification-edit/certification-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/empresas',
    pathMatch: 'full'
  },
  {
    path: 'empresas',
    component: CompanyListComponent
  },
  {
    path: 'empresas/agregar',
    component: CompanyFormComponent
  },
  {
    path: 'empresas/editar/:id',
    component: CompanyEditComponent
  },{
    path: 'certificaciones',
    component: CertificationListComponent
  },{
    path: 'certificaciones/editar/:id',
    component: CertificationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
