import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  userData:any= {};

  constructor(private _authService:AuthService, public _router:Router) { }

  ngOnInit(): void {

    this._authService.userData.subscribe({
    next: ()=> {      
        if (this._authService.userData.getValue() != null) {
          this.isLogin = true;
          this.userData = this._authService.userData.getValue();
        } else {
          this.isLogin = false;
        }
      }
    });

  }

  logOut() {
    this._authService.logOut();
  }


}
