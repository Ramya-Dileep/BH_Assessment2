import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { User } from '../models/user.model';
import {LoginService} from '../service/login.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidCredentials: boolean = false;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService, 
                private loginService : LoginService)
  {
    console.log('UserLoginComponent constructor');
    const remembered = localStorage.getItem('LoggedUser');
      let rememberedUser = '';
      if (remembered) {
        try {
          rememberedUser = JSON.parse(remembered).userName || '';
        } catch (_) {
          console.warn('Failed to parse remembered user');
        }
      }
    const rememberedSSO = localStorage.getItem('RememberedSSO') || '';
    this.loginForm = this.fb.group({
    userName: new FormControl(rememberedSSO, Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(!!rememberedUser) // true if user is remembered
  });
  }


onLogin() {
  console.log("login click");

  if (this.loginForm.valid) {
    const { userName, password, rememberMe } = this.loginForm.value;

    this.loading = true;  // start spinner or disable button

    this.loginService.login(userName, password).subscribe({
      next: isValid => {
        if (isValid) {
          const user: User = { userName };
          this.authService.setCurrentUser(user, rememberMe);
          this.invalidCredentials = false;
          this.router.navigate(['/dashboard']);
           this.loading = false;  

        } else {
          this.invalidCredentials = true;
        }
      },
      error: err => {
        console.error('Login failed:', err);
        this.invalidCredentials = true;
      },
      complete: () => {
        this.loading = false;  // stop spinner / enable button
      }
    });
  } else {
    console.log('Form is invalid');
  }
}


//   onLogin() {
//   console.log("login click");

//   if (this.loginForm.valid) {
//     const { userName, password, rememberMe } = this.loginForm.value;

//     this.loading = true;  // Start spinner / disable button

//     this.loginService.login(userName, password).subscribe({
//       next: isValid => {
//         if (isValid) {
//           const user: User = { userName };
//           this.authService.setCurrentUser(user, rememberMe);
//           this.invalidCredentials = false;
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.invalidCredentials = true;
//         }
//       },
//       error: err => {
//         console.error('Login failed:', err);
//         this.invalidCredentials = true;
//       },
//       complete: () => {
//         this.loading = false; // Stop spinner / enable button
//       }
//     });
//   } else {
//     console.log('Form is invalid');
//   }
// }


// onLogin() {
// console.log("login click")
// if (this.loginForm.valid) {
//       const { userName, password, rememberMe } = this.loginForm.value;
 
//       this.loginService.login(userName, password).subscribe(isValid => {
//         if (isValid) {
//           const user: User = { userName };
//           this.authService.setCurrentUser(user, rememberMe);
//            this.invalidCredentials = false;
//           this.router.navigate(['/dashboard']);
//         } else {
//            this.invalidCredentials = true;
//         }
//       });
//     } else {     
//      console.log('Form is invalid');
//     }
//   }

  // if (this.loginForm.valid) {
  //   console.log("login valid")
  //   const userName = this.loginForm.get('userName')?.value;
  //   const rememberMe = this.loginForm.get('rememberMe')?.value;

  //     const user: User = { userName }; // Or whatever shape your `User` model has

  //     this.authService.setCurrentUser(user, rememberMe);


  //   this.router.navigate(['/dashboard']).then(success => {
  //     console.log('Navigation success?', success);
  //   });
  // } else {
  //   console.log('Form is invalid');
  // }




 ngOnInit(): void {
    console.log('UserLoginComponent loaded');
  }

}
