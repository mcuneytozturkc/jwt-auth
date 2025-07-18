import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../models/UserProfile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private tokenKey = 'jwtToken';
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) { }

  register(password: string, email: string, fullName: string, birthDate: string, gender: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, { password, email, fullName, birthDate, gender });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            this.isLoggedIn$.next(true);
          }
        })
      );
  }


  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);

  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getTokenExpireDate(): Date | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return null;
    return new Date(payload.exp * 1000); // exp saniye cinsinden
  }

  getRemainingTime(): number {
    const expireDate = this.getTokenExpireDate();
    if (!expireDate) return 0;
    return Math.max(0, expireDate.getTime() - Date.now());
  }

  getProfile() {
    return this.http.get<{ user: UserProfile }>(`${this.apiUrl}/profile`);
  }


  changePassword(newPassword: string) {
    return this.http.post(`${this.apiUrl}/auth/change-password`, { newPassword });
  }

  updateProfile(profile: UserProfile) {
    return this.http.put<{ message: string; user: UserProfile }>(
      `${this.apiUrl}/profile`,
      profile
    );
  }

}
