import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  nome = '';
  email = '';
  senha = '';

  constructor(private http: HttpClient) {}

  cadastrar() {
    this.http.post('http://localhost:8080/funcionarios', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      role: 'USER'
    }).subscribe({
      next: (res) => console.log('CADASTRADO', res),
      error: (err) => console.error('ERRO', err)
    });
  }
}