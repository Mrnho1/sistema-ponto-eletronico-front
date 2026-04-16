import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{

  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (res: any) => {
        this.auth.salvarToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Login inválido');
      }
    });
  }
}