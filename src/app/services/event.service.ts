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
                  .pipe(map(res => {
    return res.json().map(item => {
      return {
        title: item.title,
        start: item.publishdate
      }
    })
  }));
}
  
}
