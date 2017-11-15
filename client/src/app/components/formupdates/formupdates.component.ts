import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-formupdates',
  templateUrl: './formupdates.component.html',
  styleUrls: ['./formupdates.component.css']
})
export class FormupdatesComponent implements OnInit {

  formUpdates;

  constructor(
    private http: Http
  ) {
    http.get('/assets/formupdates.json')
      .map(res => res.json())
      .subscribe(data => this.formUpdates = data, err => console.log(err), () => {
        return true;
    })
  }

  animateList() {
    $("#form-update-container").delay(1750).animate({
      top: '-=50'
    }, "slow", "swing");
  }
  resetList() {
    $("#form-update-container").delay(5000).animate({
      top: '+=500'
    }, 3500, "swing");
    setTimeout(() => {
      this.listScroll();
    }, 5000);
  }

  listScroll() {
    let count = 0;
    let self = this;
    function next() {
      count++;
      if(count < 11) {
        self.animateList();
        next();
      } else if (count === 11) {
        self.resetList();
      }
    }
    next();
  }

  ngOnInit() {
    this.listScroll();
  }

}
