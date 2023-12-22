import {
  NbLayoutModule, NbSidebarModule, NbButtonModule, NbInputModule,
  NbCardModule, NbFormFieldModule, NbIconModule, NbMenuModule,
  NbSearchModule, NbUserModule, NbActionsModule, NbToastrModule, NbDialogModule
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UsersComponent } from './maintenance/users/users.component';
import { ProfilesComponent } from './maintenance/profiles/profiles.component';
import { EmployeesComponent } from './maintenance/employees/employees.component';
import { PatientsComponent } from './maintenance/patients/patients.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../helpers/token.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import { DataSheetsComponent } from './tests/data-sheets/data-sheets.component';
import { Bdi2Component } from './tests/bdi2/bdi2.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResultsComponent } from './tests/results/results.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    UsersComponent,
    ProfilesComponent,
    EmployeesComponent,
    PatientsComponent,
    DataSheetsComponent,
    Bdi2Component,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbEvaIconsModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NoopAnimationsModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbToastrModule.forRoot(),
    NgbPaginationModule,
    FontAwesomeModule,
    NbDialogModule.forRoot(),
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class PagesModule { }