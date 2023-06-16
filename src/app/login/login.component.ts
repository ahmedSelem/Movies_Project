import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showErorr:string='';
  isLoading:boolean = false;
  constructor(private _authService:AuthService, private _router:Router) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(4),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-z][a-z]{2,8}'),
    ]),
  });
  
  submitLogin(loginData:FormGroup) {
    if(loginData.valid) {
      this.isLoading = true;
      this._authService.postLogin(loginData.value).subscribe({
        next: (response)=> {
          if (response.status == 'ok') {
            this._router.navigate(['/home']);
            localStorage.setItem('userToken', response.accessToken);
            this._authService.saveUserData();
            this.isLoading = false;
          } 
        },
        error: (msg)=> {
          this.isLoading = false;
          this.showErorr = msg.error.message
        }
      })
    }
  }


}
