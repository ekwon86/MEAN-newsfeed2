import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  message;
  messageClass;
  newNews = false;
  form;
  processing = false;
  newsPosts;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private newsService: NewsService
  ) {
    this.createNewNewsForm();
  }

  /** CREATE FORM **/
  createNewNewsForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      date: ['', Validators.compose([
        Validators.required,
      ])],
      snippet: ['', Validators.compose([
        Validators.required,
        Validators.minLength(25),
        Validators.maxLength(300)
      ])],
      url: ['', Validators.compose([
        Validators.required,
        this.urlValidation
      ])]
    });
  }

  /** ENABLE/DISABLE FORM WHEN SUBMITTING **/
  enableFormNewNewsForm() {
    this.form.get('title').enable();
    this.form.get('date').enable();
    this.form.get('snippet').enable();
    this.form.get('url').enable();
  }

  disableFormNewNewsForm() {
    this.form.get('title').disable();
    this.form.get('date').disable();
    this.form.get('snippet').disable();
    this.form.get('url').disable();
  }


  /** SUBMIT NEWS ARTICLE **/
  onNewsSubmit() {
    this.processing = true;
    this.disableFormNewNewsForm();

    const event = {
      title: this.form.get('title').value,
      date: this.form.get('date').value,
      snippet: this.form.get('snippet').value,
      url: this.form.get('url').value
    };

    this.newsService.newEvent(event).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableFormNewNewsForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.newNews = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableFormNewNewsForm();
          this.getAllEvents();
          document.getElementById('cancelNewNews').click();
        }, 2000);
      }
    });
  }

  /** FORM VALIDATION **/
  urlValidation(controls) {
    const regExp = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'urlValidation': true };
    }
  }

  /** GET NEWS ARTICLES **/
  getAllEvents() {
    this.newsService.getAllNews().subscribe(data => {
      this.newsPosts = data.news;
    });
  }

  ngOnInit() {
    this.getAllEvents();
  }

}
