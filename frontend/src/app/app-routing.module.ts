import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
{
  path:'',component:AppLayoutComponent,
  children:[
    { path:'',component:DashboardComponent  },
    { path:'user',component:ViewUserComponent},
    { path:'department',component:DepartmentComponent},
    

  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
