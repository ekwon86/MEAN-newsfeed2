import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
import { DevAdminComponent } from './components/home/dev-admin/dev-admin.component';
import { DevUserComponent } from './components/home/dev-user/dev-user.component';
import { ProdAdminComponent } from './components/home/prod-admin/prod-admin.component';
import { ProdUserComponent } from './components/home/prod-user/prod-user.component';
import { EnterpriseComponent } from './components/home/enterprise/enterprise.component';
import { DeleteEventComponent } from './components/events/delete-event/delete-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // {
  //   path: 'dev-admin',
  //   component: DevAdminComponent
  // },
  // {
  //   path: 'dev-user',
  //   component: DevUserComponent
  // },
  // {
  //   path: 'prod-admin',
  //   component: ProdAdminComponent
  // },
  // {
  //   path: 'prod-user',
  //   component: ProdUserComponent
  // },
  // {
  //   path: 'enterprise',
  //   component: EnterpriseComponent
  // },
  {
    path: 'edit-event/:id',
    component: EditEventComponent
  },
  {
    path: 'delete-event/:id',
    component: DeleteEventComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
