import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { JobService } from '../services/job.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'cc-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {
  jobs = [];
  error = "";
  displayEvent: any;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private jobService: JobService, private eventService: EventService) { }

  ngOnInit() {
    this.jobService.getJobs()
              .subscribe(
                data => this.jobs = data,
                error => {
                  console.error(error);
                  this.error = error;
                }
              );
              this.eventService.getEvents().subscribe(data => {
                this.calendarOptions = {
                  editable: true,
                  eventLimit: false,
                  header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listMonth'
                  },
                  events: data
                };
              });
            }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}
