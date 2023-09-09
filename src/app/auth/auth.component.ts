import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthInterface } from './auth.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  showErorr: string = '';
  loginMode = true;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  triggerMode() {
    this.loginMode = !this.loginMode;
  }

  submitAuth(registerData: NgForm) {
    let authObservable: Observable<AuthInterface>;

    if (registerData.valid) {
      this.isLoading = true;
      if (this.loginMode) {
        authObservable = this._authService.postLogin(registerData.value);
      } else {
        authObservable = this._authService.postRegister(registerData.value);
      }

      authObservable.subscribe({
        next: (response) => {
          this._router.navigate(['/home']);
          this.isLoading = false;
          console.log(response);
        },
        error: (msg) => {
          this.isLoading = false;
          this.showErorr = msg.error.error.message;
          console.log(msg);
          switch (msg.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              return this.showErorr = 'Email not fount';
              break;
            case 'INVALID_PASSWORD':
              return this.showErorr = 'The password is invalid.';
              break;
            case 'USER_DISABLED':
              return this.showErorr = 'The user account has been disabled by an administrator.';
              break;
            case 'EMAIL_EXISTS':
              return this.showErorr = 'The email address is already in use by another account.';
              break;
            case 'INVALID_EMAIL':
              return this.showErorr = 'The email should be like this (test@gmail.com).';
              break;
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
              return this.showErorr = 'Password should be at least 6 characters';
              break;
            default:
              return this.showErorr = 'Error has occurred';
          }
        },
      });
    }
  }

  // Custom Validation
  // confirmPasswordValidator(
  //   control: FormControl
  // ): { [s: string]: boolean } | null {
  //   if (control.value != this.AuthForm?.value.password) {
  //     return { "confirm Password doesn't match": true };
  //   }
  //   return null;
  // }
}
