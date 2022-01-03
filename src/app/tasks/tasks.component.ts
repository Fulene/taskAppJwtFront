import { AuthenticationService } from './../services/authentication.service';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  currentUser!: User;
  finalData: { year: number; rate: any; }[] = [];

  constructor(
    private tasksService: TasksService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCurrentUser()!;
    if (!this.authenticationService.isAuthenticated())
      this.router.navigateByUrl('/login');
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.loadTasks().subscribe(
      (res) => (this.tasks = res),
      (err) => {
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
      }
    );
  }

  removeTask(task: Task) {
    this.tasksService
      .removeTask(task.id!)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  test() {
    this.tasksService.test().subscribe((res: any) => {
      let startDate = 2000;
      let i = 0;
      Object.entries(res.dataSets[0].observations).forEach((arr: any[]) => {
        if (arr[0].startsWith("0"))
          this.finalData.push({year: startDate + i, rate: arr[1][0]})
        i++;
      })
      this.finalData = [...this.finalData];
    });
  }
}
