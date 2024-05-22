import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';

import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { InputTextModule } from 'primeng/inputtext';
import { DepartmentComponent } from './department/department.component';

import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, ViewUserComponent, DepartmentComponent, 

  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    AppRoutingModule,
    
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

    TableModule,
    PaginatorModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
    InputTextModule,
    DialogModule

    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
