import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom/classroom.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { AddClassroomComponent } from './classroom/add-classroom/add-classroom.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component'


//login okta
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';
import { LoginComponent } from './login/login.component';

const oktaConfig: OktaAuthOptions = {
  issuer: 'https://dev-12254617.okta.com’/oauth2/default',
  clientId: '0oa1073l82zcpeQp25d7',
  redirectUri: window.location.origin + '/callback'
};
//

const appRoutes:Routes = [
  {
    path: '', component:ClassroomComponent
  },
  {
    path: 'add-classroom', component:AddClassroomComponent
  },
  {
    path: 'edit/:id', component:EditClassroomComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    NavbarComponent,
    AddClassroomComponent,
    EditClassroomComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
