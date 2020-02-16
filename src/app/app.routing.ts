import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { IntegratorComponent } from './integrator/integrator.component';
import { LoginComponent } from './login/login.component';
import { VerifyGuard } from './verify.guard';



const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: '',
    component: IntegratorComponent,
    canActivate: [VerifyGuard], //ESTO LIMITA A NO ENTRAR
    children: [{
      path: '',
      loadChildren: './integrator/integrator.module#IntegratorModule'
    }]
  },
  {
    path: 'login',    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
