import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected host: string = 'http://localhost:8080';
  protected jwtToken?: string | null;
  protected options: any;

  constructor(protected http: HttpClient) {}

  refreshReqOptions() {
    this.jwtToken = localStorage.getItem('token');
    this.options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + (this.jwtToken || []),
      }),
    };
  }
}
