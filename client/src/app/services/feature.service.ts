import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FeatureService {

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

  // Function to get single feature
  getSingleFeature(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'features/singleFeature/' + id, this.options).map(res => res.json());
  }


  // Function to get all features from the db
  getAllFeatures(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'features/allFeatures', this.options).map(res => res.json());
  }

  // Function to create a new feature post
  newFeature(feature) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'features/newFeature', feature, this.options).map(res => res.json());
  }

  // Function to edit feature
  editFeature(feature) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'features/updateFeature', feature, this.options).map(res => res.json());
  }

  // Function to delete feature post
  deleteFeature(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'features/deleteFeature/' + id, this.options).map(res => res.json());
  }

}
