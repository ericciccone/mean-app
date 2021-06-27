import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

//okta
import { OktaCallbackComponent, OktaAuthGuard, OktaAuthService } from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';
import { Injector} from '@angular/core';
import { ClassroomComponent } from './classroom/classroom/classroom.component';
import { AddClassroomComponent } from './classroom/add-classroom/add-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';


const routes: Routes = [
  { path: '', component: ClassroomComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: '#', component: ClassroomComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'home', component: ClassroomComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'add-classroom', component: AddClassroomComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'edit/:id', component: EditClassroomComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent }
];

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector): void {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
