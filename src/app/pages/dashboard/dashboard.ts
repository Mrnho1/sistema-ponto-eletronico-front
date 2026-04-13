import { Component, OnInit, ViewChild } from '@angular/core';
import { PontoService } from '../../services/ponto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { Toast } from '../../shared/toast/toast';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, NavbarComponent, Toast],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  @ViewChild(Toast) toast!: Toast;

  saldo = '';
  status = 'Fora do expediente';

  ultimoTipo: string | null = null;
  botaoTexto = 'Clique para Entrar';

  historico: any[] = [];
  ultimoRegistro: any = null;

  carregado = false;

  constructor(private pontoService: PontoService) {}

  ngOnInit() {
    this.carregarBancoHoras();
    this.carregarHistorico();
  }

  carregarBancoHoras() {
    this.pontoService.getBancoHoras()
      .subscribe((res: any) => {
        this.saldo = res.saldoFormatado;
      });
  }

  carregarHistorico() {
  this.pontoService.getHoje()
    .subscribe((res: any[]) => {

      this.historico = res;

      if (res.length > 0) {
        this.ultimoRegistro = res[res.length - 1];
        this.ultimoTipo = this.ultimoRegistro.tipo;
      } else {
        // 🔥 PRIMEIRO ACESSO
        this.ultimoRegistro = null;
        this.ultimoTipo = null;
      }

      // 🔥 DEFINE UI SEMPRE
      this.status = this.ultimoTipo === 'ENTRADA'
        ? 'Trabalhando'
        : 'Fora do expediente';

      this.botaoTexto = this.ultimoTipo === 'ENTRADA'
        ? 'Registrar Saída'
        : 'Registrar Entrada';
    });
}

  baterPonto() {

  let tipo = this.ultimoTipo === 'ENTRADA' ? 'SAIDA' : 'ENTRADA';

  this.pontoService.baterPonto(tipo)
    .subscribe({
      next: (res: any) => {

  this.ultimoTipo = res.tipo;

  if (res.tipo === 'ENTRADA') {
    this.toast.show('Entrada registrada', 'success');
  } else {
    this.toast.show('Saída registrada', 'info');
  }

  this.status = res.tipo === 'ENTRADA'
    ? 'Trabalhando'
    : 'Fora do expediente';

  this.botaoTexto = res.tipo === 'ENTRADA'
    ? 'Registrar Saída'
    : 'Registrar Entrada';

  this.carregarBancoHoras();
  this.carregarHistorico();
},

      error: (err) => {
        console.error(err);
      }
    });
}
getBotaoClasse() {

  // 🔵 PRIMEIRO ACESSO
  if (!this.ultimoTipo) {
    return 'btn-azul';
  }

  // 🟢 VAI REGISTRAR ENTRADA
  if (this.ultimoTipo === 'SAIDA') {
    return 'btn-verde';
  }

  // 🔴 VAI REGISTRAR SAÍDA
  if (this.ultimoTipo === 'ENTRADA') {
    return 'btn-vermelho';
  }

  return 'btn-azul';
}
}