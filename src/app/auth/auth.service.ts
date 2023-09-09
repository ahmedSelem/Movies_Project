import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthInterface } from './auth.interface';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<UserModel | null>(null);
  authURL = new Subject<boolean>();
  private logoutTimeOut?: any;
  private apiKey: string = 'AIzaSyCYKa02g8MTevEjIp8rtN8vhES_pMXDFNc';

  constructor(private http: HttpClient, private _router: Router) {}

  postLogin(formData: {
    email: string;
    password: string;
  }): Observable<AuthInterface> {
    return this.http
      .post<AuthInterface>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((reposne) => {
          this.handelSaveUserData(
            reposne.email,
            reposne.localId,
            reposne.idToken,
            +reposne.expiresIn
          );
        })
      );
  }

  postRegister(formData: { email: string; password: string }): Observable<any> {
    return this.http
      .post<AuthInterface>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((reposne) => {
          this.handelSaveUserData(
            reposne.email,
            reposne.localId,
            reposne.idToken,
            +reposne.expiresIn
          );
        })
      );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    this._router.navigate(['/auth']);
    if (this.logoutTimeOut) {
      clearTimeout(this.logoutTimeOut);
    }
    this.logoutTimeOut = null;
  }

  autoLogin() {
    const getUserData: any = localStorage.getItem('currentUser');
    const userData: any = JSON.parse(getUserData);

    if (!getUserData) {
      return;
    }
    const currentuser = new UserModel(
      userData.email,
      userData.localId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (currentuser.token) {
      this.currentUser.next(currentuser);
      const remainingTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        console.log(remainingTime);
      this.autoLogout(remainingTime);
    }
  }

  autoLogout(expirationDate: number) {
    this.logoutTimeOut = setTimeout(() => {
      this.logOut();
    }, expirationDate);
  }

  // Chek If The (Url Path == '/Auth') To Prevent Show Navbar And Footer (by using Navbar Guard)
  getSnapshotUrlState(value: boolean) {
    this.authURL.next(value);
  }

  private handelSaveUserData(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const tokenExpirationDate: Date = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    let currentUser = new UserModel(
      email,
      localId,
      idToken,
      tokenExpirationDate
    );
    this.currentUser.next(currentUser);
    
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}
