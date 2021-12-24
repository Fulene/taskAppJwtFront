import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    this.tasks = [
      { id: 0, name: 'T1' },
      { id: 0, name: 'T2' },
      { id: 0, name: 'T3' },
      { id: 0, name: 'T4' },
      { id: 0, name: 'T5' },
    ];
  }
}
