import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  currentNews = {
    title: '',
    date: '',
    snippet: '',
    url: '',
    imgPath: '',
    _id: ''
  };

  imgPath = '';
  message;
  imgMessage;
  messageClass;
  imgMessageClass;
  newNews = false;
  form;
  processing = false;
  newsPosts;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private newsService: NewsService,
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
      ])],
      imgPath: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  /** ENABLE/DISABLE FORM WHEN SUBMITTING **/
  enableFormNewNewsForm() {
    this.form.get('title').enable();
    this.form.get('date').enable();
    this.form.get('snippet').enable();
    this.form.get('url').enable();
    this.form.get('imgPath').enable();
  }

  disableFormNewNewsForm() {
    this.form.get('title').disable();
    this.form.get('date').disable();
    this.form.get('snippet').disable();
    this.form.get('url').disable();
    this.form.get('imgPath').disable();
  }


  /** SUBMIT NEWS ARTICLE **/
  onNewsSubmit() {
    this.processing = true;
    this.disableFormNewNewsForm();

    const news = {
      title: this.form.get('title').value,
      date: this.form.get('date').value,
      snippet: this.form.get('snippet').value,
      url: this.form.get('url').value,
      imgPath: this.form.get('imgPath').value
    };

    this.newsService.newNews(news).subscribe(data => {
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
          this.getAllNews();
          document.getElementById('cancelNewNews').click();
        }, 2000);
      }
    });
  }

  /** UPDATE NEWS **/
  updateNewsSubmit() {
    this.processing = true;
    this.newsService.editNews(this.currentNews).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false;
          this.message = false;
          this.getAllNews();
          document.getElementById('cancelEditNews').click();
        }, 2000);
      }
    });
  }

  /** DELETE NEWS **/
  deleteNews() {
    this.processing = true;
    this.newsService.deleteNews(this.currentNews._id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false;
          this.message = false;
          this.getAllNews();
          document.getElementById('cancelDeleteNews').click();
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
  getAllNews() {
    this.newsService.getAllNews().subscribe(data => {
      this.newsPosts = data.news;
    });
  }


  /** GET CURRENT NEWS **/
  getCurrentNews(id) {
    this.newsService.getSingleNews(id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'News article not found'
      } else {
        this.currentNews = data.news;
      }
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('img', file, file.name);
      this.newsService.newPicture(formData).subscribe(data => {
          if(!data.success) {
            this.imgMessageClass = 'alert alert-danger';
            this.imgMessage = 'There was an error';
          } else {
            this.imgMessageClass = 'alert alert-success';
            this.imgMessage = 'Image was successfully uploaded!';
            this.imgPath = data.url;
            setTimeout(() => {
                this.imgMessageClass = false;
                this.imgMessage = false;
            }, 2000);
          }
        }
      );
    }
  }


  ngOnInit() {
    this.getAllNews();
  }
}
