import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  login() {
    if (this.form.invalid) return;
    console.log(this.f());
  }
}
