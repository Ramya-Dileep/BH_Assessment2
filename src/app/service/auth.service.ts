import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('LoggedUser', JSON.stringify(user));
  }

  constructor() {
    const storedUser = localStorage.getItem('LoggedUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) as User : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(parsedUser);
  }

  currentUser$ = this.currentUserSubject.asObservable();


  getCurrentUser(): User | null {
  const user = this.currentUserSubject.value;
  if (user) return user;

  const stored = sessionStorage.getItem('LoggedUser') || localStorage.getItem('LoggedUser');
  return stored ? JSON.parse(stored) as User : null;

  }

  clearUser(): void {
  this.currentUserSubject.next(null);
  localStorage.removeItem('LoggedUser');
  sessionStorage.removeItem('LoggedUser');
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
