import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private userIdKey = 'user_id';

  loginWithToken(token: string, id:string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, id);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
