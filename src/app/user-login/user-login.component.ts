import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService)
  {
     const rememberedUser = localStorage.getItem('LoggedUser');

    this.loginForm = this.fb.group({
    userName: new FormControl(rememberedUser || '', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(!!rememberedUser) // true if user is remembered
  });
  }

onLogin() {
  if (this.loginForm.valid) {
    console.log("login valid")
    const userName = this.loginForm.get('userName')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    // if (rememberMe) {
    //   localStorage.setItem('LoggedUser', userName);
    // } else {
    //   sessionStorage.setItem('LoggedUser', userName);
    //   localStorage.removeItem('LoggedUser');
    // }

    // this.authService.setCurrentUser(userName);

      const user: User = { userName }; // Or whatever shape your `User` model has

      if (rememberMe) {
        localStorage.setItem('LoggedUser', JSON.stringify(user));
      } else {
        sessionStorage.setItem('LoggedUser', JSON.stringify(user));
        localStorage.removeItem('LoggedUser');
      }

      this.authService.setCurrentUser(user);


    this.router.navigate(['/dashboard']).then(success => {
      console.log('Navigation success?', success);
    });
  } else {
    console.log('Form is invalid');
  }
}



  ngOnInit(): void {
    console.log('UserLoginComponent loaded');
  }

}
