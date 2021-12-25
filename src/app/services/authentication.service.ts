import { BaseService } from './base.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  private _currentuser?: User;
  private _jwtHelper!: JwtHelperService;

  constructor(protected http: HttpClient) {
    super(http);
    this._jwtHelper = new JwtHelperService();
    this.refreshCurrentUser();
  }

  getCurrentUser() {
    return this._currentuser;
  }

  login(user: User): Observable<any> {
    // "observe" : Car besoin de check la response http (end point de spring security ne renvoyant pas un simple json)
    return this.http.post(this.host + '/login', user, { observe: 'response' });
  }

  logout(): void {
    this.jwtToken = null;
    localStorage.removeItem('token');
  }

  saveToken(jwtToken: string): void {
    localStorage.setItem('token', jwtToken);
    this.refreshReqOptions();
    this._currentuser = new User(this._jwtHelper.decodeToken(jwtToken));
  }

  refreshCurrentUser() {
    this.refreshReqOptions();
    let currentToken = localStorage.getItem('token');
    if (currentToken)
      this._currentuser = new User(this._jwtHelper.decodeToken(currentToken));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
