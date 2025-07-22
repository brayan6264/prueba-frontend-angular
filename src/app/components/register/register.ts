import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user: User = {
  name: '',
  email: '',
  password: ''
};

  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  submitRegisterForm() {
  console.log('User JSON to send:', this.user);

  this.userService.register(this.user).subscribe({
    next: () => {
      this.successMessage = 'Usuario registrado correctamente.';
      this.errorMessage = '';
      this.user = { name: '', email: '', password: '' };
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2500);
    },
    error: (err) => {
      console.error('Error en el registro:', err);
      this.errorMessage = 'Error al hacer el registro. Por favor, inténtalo de nuevo.';
      this.successMessage = '';
    }
  });
}}
