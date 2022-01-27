import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { CompanyComponent } from './company/company.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OfficesComponent } from './offices/offices.component';
import { PackagesComponent } from './packages/packages.component';
import { RegisterComponent } from './register/register.component';
import { SendPackageComponent } from './send-package/send-package.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AutoLoginGuard ] },
  // TODO ADD , canActivate: [ AuthGuard ] after testing
  { path: 'packages', component: PackagesComponent },
  // TODO ADD , canActivate: [ AuthGuard, WorkerGuard ] after testing
  { path: 'send_package', component: SendPackageComponent },
  // TODO ADD , canActivate: [ AuthGuard, AdminGuard ] after testing
  { path: 'company', component: CompanyComponent },
  // TODO ADD , canActivate: [ AuthGuard, AdminGuard ] after testing
  { path: 'employees', component: EmployeesComponent },
  // TODO ADD , canActivate: [ AuthGuard, AdminGuard ] after testing
  { path: 'customers', component: CustomersComponent },
  // TODO ADD , canActivate: [ AuthGuard, AdminGuard ] after testing
  { path: 'offices', component: OfficesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
