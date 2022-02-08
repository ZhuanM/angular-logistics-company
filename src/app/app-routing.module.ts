import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { WorkerGuard } from './auth/worker.guard';
import { CompanyComponent } from './company/company.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfficesComponent } from './offices/offices.component';
import { PackagesComponent } from './packages/packages.component';
import { RegisterComponent } from './register/register.component';
import { SendPackageComponent } from './send-package/send-package.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'packages', component: PackagesComponent, canActivate: [ AuthGuard ] },
  { path: 'send_package', component: SendPackageComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'company', component: CompanyComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'employees', component: EmployeesComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'customers', component: CustomersComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'offices', component: OfficesComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
