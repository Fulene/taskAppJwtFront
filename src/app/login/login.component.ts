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

  }

  onClickLogo() {
    alert("MAX !!!!")
  }

}
