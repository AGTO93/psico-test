import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbInputModule, NbCardModule, NbFormFieldModule, NbIconModule, NbMenuModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    FormsModule,
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
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ],
  providers: [],
})
export class PagesModule { }