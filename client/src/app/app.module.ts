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
    DeleteEventComponent
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
