import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDevAdmin = false;
  isDevUser = false;
  isProdAdmin = false;
  isProdUser = false;
  isEnterprise = false;

  constructor() { }

  ngOnInit() {
    this.getCurrentUrl();
  }

  getCurrentUrl() {
    const str = window.location.href;
    const tmp = str.lastIndexOf("/");
    const result = str.substring(tmp + 1);
    console.log(result);
    if(result === "dev-admin") {
      this.isDevAdmin = true;
    } else if (result === "dev-user") {
      this.isDevUser = true;
    } else if (result === "prod-admin") {
      this.isProdAdmin = true;
    } else if (result === "prod-user") {
      this.isProdUser = true;
    } else if (result === "enterprise") {
      this.isEnterprise = true;
    }
  }

}
