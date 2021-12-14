import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  // ADD "canActivate: [ AuthGuard ]" FOR THE REST OF THE COMPONENTS THAT NEED IT
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
