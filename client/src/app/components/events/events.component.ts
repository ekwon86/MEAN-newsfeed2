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
  states = [
    {
      "name": "Alabama",
      "abbreviation": "AL"
    },
    {
      "name": "Alaska",
      "abbreviation": "AK"
    },
    {
      "name": "Arizona",
      "abbreviation": "AZ"
    },
    {
      "name": "Arkansas",
      "abbreviation": "AR"
    },
    {
      "name": "California",
      "abbreviation": "CA"
    },
    {
      "name": "Colorado",
      "abbreviation": "CO"
    },
    {
      "name": "Connecticut",
      "abbreviation": "CT"
    },
    {
      "name": "Delaware",
      "abbreviation": "DE"
    },
    {
      "name": "District Of Columbia",
      "abbreviation": "DC"
    },
    {
      "name": "Florida",
      "abbreviation": "FL"
    },
    {
      "name": "Georgia",
      "abbreviation": "GA"
    },
    {
      "name": "Hawaii",
      "abbreviation": "HI"
    },
    {
      "name": "Idaho",
      "abbreviation": "ID"
    },
    {
      "name": "Illinois",
      "abbreviation": "IL"
    },
    {
      "name": "Indiana",
      "abbreviation": "IN"
    },
    {
      "name": "Iowa",
      "abbreviation": "IA"
    },
    {
      "name": "Kansas",
      "abbreviation": "KS"
    },
    {
      "name": "Kentucky",
      "abbreviation": "KY"
    },
    {
      "name": "Louisiana",
      "abbreviation": "LA"
    },
    {
      "name": "Maine",
      "abbreviation": "ME"
    },
    {
      "name": "Maryland",
      "abbreviation": "MD"
    },
    {
      "name": "Massachusetts",
      "abbreviation": "MA"
    },
    {
      "name": "Michigan",
      "abbreviation": "MI"
    },
    {
      "name": "Minnesota",
      "abbreviation": "MN"
    },
    {
      "name": "Mississippi",
      "abbreviation": "MS"
    },
    {
      "name": "Missouri",
      "abbreviation": "MO"
    },
    {
      "name": "Montana",
      "abbreviation": "MT"
    },
    {
      "name": "Nebraska",
      "abbreviation": "NE"
    },
    {
      "name": "Nevada",
      "abbreviation": "NV"
    },
    {
      "name": "New Hampshire",
      "abbreviation": "NH"
    },
    {
      "name": "New Jersey",
      "abbreviation": "NJ"
    },
    {
      "name": "New Mexico",
      "abbreviation": "NM"
    },
    {
      "name": "New York",
      "abbreviation": "NY"
    },
    {
      "name": "North Carolina",
      "abbreviation": "NC"
    },
    {
      "name": "North Dakota",
      "abbreviation": "ND"
    },
    {
      "name": "Ohio",
      "abbreviation": "OH"
    },
    {
      "name": "Oklahoma",
      "abbreviation": "OK"
    },
    {
      "name": "Oregon",
      "abbreviation": "OR"
    },
    {
      "name": "Pennsylvania",
      "abbreviation": "PA"
    },
    {
      "name": "Puerto Rico",
      "abbreviation": "PR"
    },
    {
      "name": "Rhode Island",
      "abbreviation": "RI"
    },
    {
      "name": "South Carolina",
      "abbreviation": "SC"
    },
    {
      "name": "South Dakota",
      "abbreviation": "SD"
    },
    {
      "name": "Tennessee",
      "abbreviation": "TN"
    },
    {
      "name": "Texas",
      "abbreviation": "TX"
    },
    {
      "name": "Utah",
      "abbreviation": "UT"
    },
    {
      "name": "Vermont",
      "abbreviation": "VT"
    },
    {
      "name": "Virginia",
      "abbreviation": "VA"
    },
    {
      "name": "Washington",
      "abbreviation": "WA"
    },
    {
      "name": "West Virginia",
      "abbreviation": "WV"
    },
    {
      "name": "Wisconsin",
      "abbreviation": "WI"
    },
    {
      "name": "Wyoming",
      "abbreviation": "WY"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private eventService: EventService
  ) {
    this.createNewEventForm();
  }

  /** NEW EVENT / CANCEL EVENT BUTTONS **/
  newEventForm() {
    this.newEvent = true;
  }
  cancelEventForm() {
    this.newEvent = false;
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

  /** SUBMIT EVENT **/
  onEventSubmit() {
    this.processing = true;
    this.disableFormNewEventForm();

    const event = {
      name: this.form.get('name').value,
      city: this.form.get('city').value,
      date: this.form.get('date').value,
      state: this.form.get('state').value,
      url: this.form.get('url').value
    };

    this.eventService.newEvent(event).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableFormNewEventForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.newEvent = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableFormNewEventForm();
          this.getAllEvents();
        }, 2000);
      }
    });
  }

  /** ENABLE/DISABLE FORM WHEN SUBMITTING **/
  enableFormNewEventForm() {
    this.form.get('name').enable();
    this.form.get('city').enable();
    this.form.get('date').enable();
    this.form.get('state').enable();
    this.form.get('url').enable();
  }

  disableFormNewEventForm() {
    this.form.get('name').disable();
    this.form.get('city').disable();
    this.form.get('date').disable();
    this.form.get('state').disable();
    this.form.get('url').disable();
  }


  /** FORM VALIDATION **/
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
