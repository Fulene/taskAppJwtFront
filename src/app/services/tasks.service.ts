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
    this.refreshReqOptions();
    return this.http
      .get(this.host + '/tasks', this.options)
      .pipe(
        map((res: any) =>
          res._embedded.tasks.map((t: Partial<Task> | undefined) => new Task(t))
        )
      );
  }

  createTask(taskName: string) {
    this.refreshReqOptions();
    return this.http
      .post(this.host + '/tasks', new Task({ name: taskName }), this.options)
      .pipe(map((res: any) => new Task(res)));
  }

  removeTask(taskId: number) {
    this.refreshReqOptions();
    return this.http.delete(this.host + '/tasks/' + taskId, this.options);
  }

  test() {
    return this.http.get('https://stats.oecd.org/sdmx-json/data/DP_LIVE/FRA+OECD.CPI.TOT.AGRWTH.A/OECD?json-lang=en&dimensionAtObservation=allDimensions&startPeriod=2000&endPeriod=2020')
  }
}
