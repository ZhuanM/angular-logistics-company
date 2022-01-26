import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { CompanyComponent } from './company/company.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { RegisterComponent } from './register/register.component';
import { SendPackageComponent } from './send-package/send-package.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [AutoLoginGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'packages', component: PackagesComponent, canActivate: [AuthGuard] },
  { path: 'send_package', component: SendPackageComponent, canActivate: [AuthGuard] },
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
