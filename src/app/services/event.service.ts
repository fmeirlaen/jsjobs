import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  jobs = [];
  calendarjobs = [];

  constructor(private http:Http) { }

  public getEvents(): Observable<any> {
  /*this.http.get('data/jobs.json')
                      .pipe(map(res => res.json()),
                      tap(data_jobs => data = data_jobs));*/                   
return this.http.get('data/jobs.json')
                    .pipe(map(res => this.getCalendarData(res)),
  );
}

public getCalendarData(data_jobs) {
  this.calendarjobs = [];
  for (let calendarjob of data_jobs) {
    //console.log(calendarjob);
    let elem = {
      title: calendarjob.title,
      start: calendarjob.publishdate
    };
    console.log(elem);
    this.calendarjobs.push(elem);
    console.log(this.calendarjobs);
  }

}
  
}
