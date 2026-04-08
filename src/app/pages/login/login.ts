import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email = '';
  senha = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        console.log('LOGADO');
      },
      error: (err) => console.error(err)
    });
  }
}