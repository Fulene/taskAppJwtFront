import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomFormValidatorsService } from '../services/custom-form-validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: this.fb.control('', Validators.required),
        newPassword: this.fb.control('', Validators.required),
        newPasswordConfirm: this.fb.control('', Validators.required),
      },
      {
        validators: [CustomFormValidatorsService.pwdConfirmationValidator],
      }
    );
  }

  f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  login() {
    if (this.form.invalid) return;
    console.log(this.f());
  }
}
