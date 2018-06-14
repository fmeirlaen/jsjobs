import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { JobService } from '../services/job.service';
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

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJobs()
              .subscribe(
                data => this.jobs = data,
                error => {
                  console.error(error);
                  this.error = error;
                }
              );
              this.jobService.jobsSubject.subscribe(data => {
                console.log(data);
                this.jobs = [data, ...this.jobs];
                
              });
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [ { title: 'Long Event', start: '2018-06-22', end: '2018-06-23'},
      { title: 'ok' , start: '2018-06-12', allDay:true},
      { title: 'Test', start: '2018-06-12', allDay:true},
     ]
    };
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
