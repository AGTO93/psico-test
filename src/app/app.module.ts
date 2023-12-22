import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbButtonModule, NbInputModule, NbCardModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbAlertModule, NbMenuModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    PagesModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbEvaIconsModule,
    NbIconModule,
    NbAlertModule,
    NbMenuModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
