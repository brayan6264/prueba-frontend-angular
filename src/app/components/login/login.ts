import { Component, signal, computed } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

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

  isLoading = signal(false); 

  private apiUrl = 'https://prueba-backend-fastapi.onrender.com/api/users/login';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submitLoginForm() {
    this.isLoading.set(true);  
    this.errorMessage = '';

    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: res => {
        this.auth.loginWithToken(res.access_token, res.user_id);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Login error:', err);
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
        this.isLoading.set(false);  
      }
    });
  }
}
