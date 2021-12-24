import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.f());
  }
}
