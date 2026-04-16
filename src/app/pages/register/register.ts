import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  nome = '';
  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.auth.register({
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: () => {
        alert('Cadastro realizado!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Erro ao cadastrar');
      }
    });
  }
}
