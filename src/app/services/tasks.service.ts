import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  loadTasks(): Observable<Task[]> {
    if (!this.jwtToken) this.refreshReqOptions();
    return this.http
      .get(this.host + '/tasks', this.options)
      .pipe(
        map((res: any) =>
          res._embedded.tasks.map((t: Partial<Task> | undefined) => new Task(t))
        )
      );
  }
}
