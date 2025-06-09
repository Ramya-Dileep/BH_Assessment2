import { Component, OnInit, OnDestroy, Input, ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../service/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() toolName: string = 'IEP';

  userName: string | null = null;
  avatarUrl: string = 'assets/images/default-avatar.png';
  dropdownOpen = false;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private eRef: ElementRef
  ) {}

   dropDownItems = [
    { name: 'TASKBAR', icon: 'task', router: '/login' },
    { name: 'SETTINGS', icon: 'settings', router: '/settings' }
  ];

  ngOnInit(): void {
    // const savedUser = localStorage.getItem('LoggedUser');
    // if (savedUser) {
    //   const user: User = JSON.parse(savedUser);
    //   this.authService.setCurrentUser(user);
    // }

    this.subscription = this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.userName;
        this.avatarUrl = user.avatar || this.avatarUrl;
      }
    });
  }

  onlogout(): void {
  this.authService.clearUser();
  this.router.navigate(['/login'], { replaceUrl: true });
}

  onMenuClick()
  {
console.log("clicked now")
  }

  DropdownClick() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  DropdownClose() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
