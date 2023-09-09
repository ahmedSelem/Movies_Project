import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  showFooter : boolean = true 

  constructor(private _authService : AuthService) {}

  ngOnInit(): void {
    this._authService.authURL.subscribe(value => {
      this.showFooter = value;
    })
    
  }

}
