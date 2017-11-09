import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-admin',
  templateUrl: './dev-admin.component.html',
  styleUrls: ['./dev-admin.component.css']
})
export class DevAdminComponent implements OnInit {

  isDevAdmin = false;

  constructor() { }

  getCurrentUrl() {
    const str = window.location.href;
    const tmp = str.lastIndexOf("/");
    const result = str.substring(tmp + 1);
    console.log(result)
    if(result === "dev-admin") {
      this.isDevAdmin = true;
    }
  }

  ngOnInit() {
    this.getCurrentUrl();
  }

}
