import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  jobs = [];
  constructor(private http:Http) { }

  public getEvents(): Observable<any> {
  /*return this.http.get('data/jobs.json')
                      .pipe(map(res => res.json()),
                            tap(data => this.jobs = data));*/
  
      let data: any = [{
        title: 'All Day Event',
        start: '2018-06-14'
    },
    {
        title: 'Long Event',
        start: '2018-06-15',
    },
    {
        title: 'Repeating Event',
        start: '2018-06-16'
    },
    {
        title: 'Repeating Event',
        start: '2018-06-17'
    },
    {
        title: 'Conference',
        start: '2018-06-18'
    }];
    return of(data);
    }
}