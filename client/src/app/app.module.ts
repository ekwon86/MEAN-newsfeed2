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
import { FeaturesComponent } from './components/features/features.component';
import { EditFeatureComponent } from './components/features/edit-feature/edit-feature.component';
import { DeleteFeatureComponent } from './components/features/delete-feature/delete-feature.component';

import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { FeatureService } from './services/feature.service';


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
    FeaturesComponent,
    EditFeatureComponent,
    DeleteFeatureComponent
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
    EventService,
    FeatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
