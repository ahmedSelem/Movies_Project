import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isAuthenticated: boolean = false;
  email? : string;
  showNavbar: boolean = true;

  constructor(private _authService: AuthService, public _router: Router) {}

  ngOnInit(): void {
    this._authService.authURL.subscribe((value) => {
      this.showNavbar = value;
    });

    this._authService.currentUser.subscribe({
      next: (currentUser) => {
        this.isAuthenticated = !!currentUser
        this.email = currentUser?.email;
      },
    });
  }

  logOut() {
    this._authService.logOut();
  }
}
