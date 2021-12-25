import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isError: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated())
      this.router.navigateByUrl('/tasks');
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

    let user = new User();
    user.name = this.f().name.value;
    user.password = this.f().password.value;

    this.authenticationService.login(user).subscribe(
      (res) => {
        let jwtToken = res.headers.get('Authorization');
        this.authenticationService.saveToken(jwtToken);
        this.router.navigateByUrl('/tasks');
      },
      (err) => (this.isError = true)
    );
  }
}
