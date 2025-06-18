  import { Injectable } from '@angular/core';
  import { Observable, of } from 'rxjs';
  import { delay } from 'rxjs/operators';
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginService { 
  
    private validCredentials = [{
      userName: 'admin',
      password: 'admin123'
    },
  {
    userName:'ramya',
    password: 'ramya123'
  }];
  
    constructor() { }

    //keeping this code  incase for future use
  
    // login(userName: string, password: string): Observable<boolean> {
    //   const isValid = userName === this.validCredentials.userName && password === this.validCredentials.password;
    //   return of(isValid).pipe(delay(1000));
    // }

  login(userName: string, password: string): Observable<boolean> {
  const isValid = this.validCredentials.some(
    user => user.userName === userName && user.password === password
  );
  return of(isValid).pipe(delay(1000));
}
  }
