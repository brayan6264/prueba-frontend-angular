import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  private apiUrl = 'https://prueba-backend-fastapi.onrender.com/api/users/login';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  submitLoginForm() {
    const payload = {
      email: this.email,
      password: this.password
    };
    console.log('Payload to send:', payload);
    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: res => {
        this.auth.loginWithToken(res.access_token, res.user_id);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log("error", err)
        this.errorMessage = 'Credenciales inválidas o error de servidor.';
      }
    });
  }
}