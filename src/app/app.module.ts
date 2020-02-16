import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {  AgmCoreModule } from '@agm/core';
import { IntegratorComponent } from './integrator/integrator.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { VerifyGuard } from './verify.guard';

@NgModule({  
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    HttpClientModule,
    MaterialModule
  ],
  
  declarations: [
    AppComponent,
    IntegratorComponent,
    LoginComponent,
  ],
  providers: [VerifyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
