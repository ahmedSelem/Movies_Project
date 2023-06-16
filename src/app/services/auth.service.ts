import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private _router:Router) {
    if (localStorage.getItem('userToken')) {
      this.saveUserData();
    }
   }
  userData = new BehaviorSubject(null);
  saveUserData() {
    let userToken = JSON.stringify(localStorage.getItem('userToken'));
    let deCodeToken:any = jwtDecode(userToken);
    this.userData.next(deCodeToken);
  }

  postRegister(formData: object):Observable<any> {
    return this.http.post('https://www.melivecode.com/api/users/create', formData);
  }
  postLogin(formData: object):Observable<any> {
    return this.http.post('https://www.melivecode.com/api/login', formData);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }

}
