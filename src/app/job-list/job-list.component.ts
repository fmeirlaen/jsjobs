import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs = [];
  error = '';

  constructor(private jobService: JobService) { }

  ngOnInit() {
    /*this.http.get('data/jobs.json')
              .pipe(map(res => {
                console.log(res.json());
                this.jobs = res.json();
              }))
              .subscribe();*/
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
      
    })
  }


}
