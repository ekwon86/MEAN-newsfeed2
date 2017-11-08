import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = 'http://localhost:8080/'; // Development Domain - Not needed in production
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  /** FUNCTION TO CREATE HEADERS, ADD TOKEN, AND USE IT IN HTTP HEADERS **/
  createAuthHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers config options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  /** LOG USER IN **/
  login(user) {
    return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
  }

  /** GET TOKEN FROM LOCAL STORAGE **/
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  /** CHECK IF ADMIN IS LOGGED IN **/
  loggedIn() {
    return tokenNotExpired();
  }

}
