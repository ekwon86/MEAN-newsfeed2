import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EventService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': this.authService.authToken
        })
    });
  }

  // Function to get single event
  getSingleEvent(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'events/singleEvent/' + id, this.options).map(res => res.json());
  }


  // Function to get all events from the db
  getAllEvents(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'events/allEvents', this.options).map(res => res.json());
  }

  // Function to create a new event post
  newEvent(event) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'events/newEvent', event, this.options).map(res => res.json());
  }

  // Function to edit event
  editEvent(event) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'events/updateEvent', event, this.options).map(res => res.json());
  }

  // Function to delete event post
  deleteEvent(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'events/deleteEvent/' + id, this.options).map(res => res.json());
  }
}
