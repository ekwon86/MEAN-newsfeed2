import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  messageClass;
  message;
  newEvent = false;
  loadingEvents = false;
  form;
  commentForm;
  processing = false;
  username;
  eventPosts;
  newComment = [];
  enabledcomments =[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventService: EventService
  ) {
    this.createNewEventForm();
  }

  newEventForm() {
    this.newEvent = true;
  }

  createNewEventForm() {
    this.form = this.formBuilder.group({
        name: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
          this.alphaNumericWithSpacesValidation
        ])],
        date: ['', Validators.compose([
          Validators.required
        ])],
        city: ['', Validators.compose([
          Validators.required,
          this.alphaNumericWithSpacesValidation
        ])],
        state: ['', Validators.compose([
          Validators.required,
          this.alphaNumericWithSpacesValidation
        ])],
        url: ['', Validators.compose([
          Validators.required,
          this.urlValidation
        ])]
    });
  }

  alphaNumericWithSpacesValidation(controls) {
    const regExp = new RegExp(/^[a-z\d\-_\s]+$/i);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'alphaNumericWithSpacesValidation': true };
    }
  }

  urlValidation(controls) {
    const regExp = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'urlValidation': true };
    }
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(data => {
        this.eventPosts = data.events;
    });
  }


  ngOnInit() {
    this.getAllEvents();
  }
}
