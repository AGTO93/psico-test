import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from '../services/guards/login.guard';

const routes: Routes = [
    {
        path: '', component: PagesComponent, children: [
            // public routes
            

            // auth routes
            { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
            

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
