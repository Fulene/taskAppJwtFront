import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskAppJwtFront';

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }
}
