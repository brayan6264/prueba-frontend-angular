import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://prueba-backend-fastapi.onrender.com/api/users'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}