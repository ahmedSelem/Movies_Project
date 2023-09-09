import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';

import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(), AuthService],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
   
    expect(app).toBeTruthy();
  });
;
});
