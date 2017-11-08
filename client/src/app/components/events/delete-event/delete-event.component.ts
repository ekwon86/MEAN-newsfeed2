import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {

  message;
  messageClass;
  foundEvent = false;
  processing = false;
  event;
  currentUrl;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteEvent() {
    this.processing = true;
    this.eventService.deleteEvent(this.currentUrl.id).subscribe(data => {
        if(!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
        } else {
          this.messageClass = 'alert-alert-success';
          this.message = data.message;
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 2000);
        }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.eventService.getSingleEvent(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.event = {
          name: data.event.name,
          date: data.event.date,
          city: data.event.city,
          state: data.event.state,
          url: data.event.url
        };
        this.foundEvent = true;
      }
    });
  }

}
