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
import { RegisterComponent } from './components/register/register.component';
import { FeaturesComponent } from './components/features/features.component';
import { NewsComponent } from './components/news/news.component';

import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { FeatureService } from './services/feature.service';
import { NewsService } from './services/news.service';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    FeaturesComponent,
    NewsComponent
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
    FeatureService,
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
