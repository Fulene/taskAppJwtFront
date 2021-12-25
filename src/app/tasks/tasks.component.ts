import { AuthenticationService } from './../services/authentication.service';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
}
