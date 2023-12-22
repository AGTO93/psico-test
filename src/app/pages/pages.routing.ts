import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from '../services/guards/login.guard';
import { UsersComponent } from './maintenance/users/users.component';
import { PatientsComponent } from './maintenance/patients/patients.component';
import { EmployeesComponent } from './maintenance/employees/employees.component';
import { DataSheetsComponent } from './tests/data-sheets/data-sheets.component';
import { Bdi2Component } from './tests/bdi2/bdi2.component';
import { ResultsComponent } from './tests/results/results.component';

const routes: Routes = [
    {
        path: '', component: PagesComponent, children: [
            // public routes
            

            // auth routes
            { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },

            // admin routes
            { path: 'users', component: UsersComponent, canActivate: [LoginGuard] },
            { path: 'patients', component: PatientsComponent, canActivate: [LoginGuard] },
            { path: 'employees', component: EmployeesComponent, canActivate: [LoginGuard] },

            // tests routes
            { path: 'data-sheets', component: DataSheetsComponent, canActivate: [LoginGuard] },
            { path: 'bdi-2', component: Bdi2Component, canActivate: [LoginGuard] },


            { path: 'results/:id', component: ResultsComponent, canActivate: [LoginGuard] },

            // default routes
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: '**', redirectTo: '/login' }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
