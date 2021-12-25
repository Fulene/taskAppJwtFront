import { BaseService } from './base.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  private _currentuser?: User;

  getCurrentuser(): User | undefined {
    return this._currentuser;
  }

  set currentuser(val: User) {
    this._currentuser = val;
  }

  constructor(protected http: HttpClient) {
    super(http);
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
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
