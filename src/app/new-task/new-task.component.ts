import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  form!: FormGroup;
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
    });
  }

  f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  save() {
    if (this.form.invalid) return;
    this.taskService.createTask(this.f().name.value).subscribe(
      (res) => this.router.navigateByUrl('/tasks'),
      (err) => (this.isError = true)
    );
  }
}
