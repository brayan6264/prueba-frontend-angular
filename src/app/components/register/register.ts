import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submitRegisterForm() {
    console.log('User JSON to send:', this.user);

    this.userService.register(this.user).subscribe({
      next: () => {
        this.toastr.success('Usuario registrado correctamente.');
        this.user = { name: '', email: '', password: '' };
        
        // Redirigir al login después de 2.5 segundos
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2500);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.toastr.error('Error al hacer el registro. Por favor, inténtalo de nuevo.');
      }
    });
  }
}

