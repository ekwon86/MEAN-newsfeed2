import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class NewsService {

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

  // Function to get single news article
  getSingleNews(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'news/singleNews/' + id, this.options).map(res => res.json());
  }


  // Function to get all news articles from the db
  getAllNews(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'news/allNews', this.options).map(res => res.json());
  }

  // Function to create a new news article
  newNews(news) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'news/newNews', news, this.options).map(res => res.json());
  }

  // Function to edit news article
  editNews(news) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'news/updateNews', news, this.options).map(res => res.json());
  }

  // Function to delete news article
  deleteNews(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'news/deleteNews/' + id, this.options).map(res => res.json());
  }

}
