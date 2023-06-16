import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  showErorr:string='';
  isLoading:boolean = false;
  constructor(private _authService:AuthService, private _router:Router) {}

  registerForm: FormGroup = new FormGroup({
    fname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(14),
      Validators.minLength(4),
    ]),
    lname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(4),
    ]),
    username: new FormControl(null, [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(4),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-z][a-z]{2,8}'),
    ]),
    avatar: new FormControl(),
  });
   
  ngOnInit(): void {
  }
  
  submitRegister(registerData:FormGroup) {
    if(registerData.valid) {
      this.isLoading = true;
      this._authService.postRegister(registerData.value).subscribe({
        next: (response)=> {
          if (response.status == 'ok') {
            this._router.navigate(['/login']);
            console.log('ok');
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
