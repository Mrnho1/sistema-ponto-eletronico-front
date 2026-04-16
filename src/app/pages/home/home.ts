import { Component } from '@angular/core';
import { PontoService } from '../../services/ponto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   saldo = '';
  historico: any[] = [];
  ultimoRegistro: any = null;
  ultimoTipo: 'ENTRADA' | 'SAIDA' | null = null;

  constructor(
    private pontoService: PontoService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.carregarDados();
  }

  carregarDados() {
    this.pontoService.getHoje().subscribe(res => {
      this.historico = res;

      if (res.length > 0) {
        this.ultimoRegistro = res[res.length - 1];
      }
    });

    this.pontoService.getBancoHoras().subscribe(res => {
      this.saldo = res.saldoFormatado;
    });
  }

  

baterPonto() {
  let tipo: 'ENTRADA' | 'SAIDA';
  
  if (!this.ultimoRegistro || this.ultimoRegistro.tipo === 'SAIDA') {
    tipo = 'ENTRADA';
  } else {
    tipo = 'SAIDA';
  }

  this.pontoService.baterPonto(tipo).subscribe({
    next: () => this.carregarDados(),
    error: () => alert('Erro ao bater ponto')
  });
}
}
