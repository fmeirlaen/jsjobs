import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();
  constructor(private http:Http) { }

  getJobs() {
    //récupération donnée de data/jobs.json et les données ajoutée manuellement depuis le formulaire
    //pas encore de récupération de data/jobs.json
    //il y a des jobs récupéré de jobs.json
    if(this.jobs.length > 0 && this.initialJobs.length > 0) {
      console.log("cas if");
      return of([...this.jobs, ...this.initialJobs])

    } else if(this.jobs.length > 0 && this.initialJobs.length === 0) {
      console.log("cas else if");
      return this.http.get('data/jobs.json')
                      .pipe(map(res => res.json()),
                            tap(data => {
                              this.initialJobs = data;
                              this.jobs = [...this.jobs, ...this.initialJobs];
                      }));

    } else {
      console.log("cas else");
      return this.http.get('data/jobs.json')
                      .pipe(map(res => res.json()),
                            tap(data => this.initialJobs = data));
    }
              
  }

  addJob(jobData) {
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.jobsSubject.next(jobData);
  }
}
