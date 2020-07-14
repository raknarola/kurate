import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPassowrdComponent } from './forgot-passowrd/forgot-passowrd.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full ' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPassowrdComponent },
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, ForgotPassowrdComponent]
})
export class LoginModule { }
