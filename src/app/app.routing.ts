import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogoutGuard } from './services/guards/logout.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent, canActivate: [LogoutGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
