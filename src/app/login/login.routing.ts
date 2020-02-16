import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

export const LoginRoutes: Routes = [
    { path: 'login',      component: LoginComponent }
];

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule.forRoot(LoginRoutes,{
         useHash: false
      })
    ],
    exports: [
    ],
  })

  export class LoginRoutingModule { }