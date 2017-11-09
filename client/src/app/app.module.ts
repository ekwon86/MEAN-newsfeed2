import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { DeleteEventComponent } from './components/events/delete-event/delete-event.component';
import { RegisterComponent } from './components/register/register.component';
import { ProdAdminComponent } from './components/home/prod-admin/prod-admin.component';
import { ProdUserComponent } from './components/home/prod-user/prod-user.component';
import { DevAdminComponent } from './components/home/dev-admin/dev-admin.component';
import { DevUserComponent } from './components/home/dev-user/dev-user.component';
import { EnterpriseComponent } from './components/home/enterprise/enterprise.component';

import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    EditEventComponent,
    DeleteEventComponent,
    RegisterComponent,
    ProdAdminComponent,
    ProdUserComponent,
    DevAdminComponent,
    DevUserComponent,
    EnterpriseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [
    AuthService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
