import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('LoggedUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    if (user) return user;

    // fallback to local storage if service restarted
    const stored = localStorage.getItem('LoggedUser');
    return stored ? JSON.parse(stored) as User : null;
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('LoggedUser');
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
