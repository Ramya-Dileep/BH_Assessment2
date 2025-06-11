  import { Injectable } from '@angular/core';
  import { Observable, of } from 'rxjs';
  import { delay } from 'rxjs/operators';
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginService { 
  
    private validCredentials = {
      userName: 'admin',
      password: 'admin123'
    };
  
    constructor() { }
  
    login(userName: string, password: string): Observable<boolean> {
      const isValid = userName === this.validCredentials.userName && password === this.validCredentials.password;
      return of(isValid).pipe(delay(1000));
    }
  }
