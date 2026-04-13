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
  botaoTexto = 'Entrar!';

  historico: any[] = [];
  ultimoRegistro: any = null;

  constructor(private pontoService: PontoService) {}

  ngOnInit() {
    this.carregarBancoHoras();
    this.carregarHistorico();
  }

  // =========================
  // BANCO DE HORAS
  // =========================
  carregarBancoHoras() {
    this.pontoService.getBancoHoras()
      .subscribe((res: any) => {
        this.saldo = res.saldoFormatado;
      });
  }

  // =========================
  // HISTÓRICO DO DIA
  // =========================
  carregarHistorico() {
    this.pontoService.getHoje()
      .subscribe((res: any[]) => {

        this.historico = res;

        if (res.length > 0) {
          this.ultimoRegistro = res[res.length - 1];
          this.ultimoTipo = this.ultimoRegistro.tipo;
        } else {
          this.ultimoRegistro = null;
          this.ultimoTipo = null;
        }

        this.atualizarUI();
      });
  }

  // =========================
  // REGRA DE UI (ÚNICA FONTE)
  // =========================
  private atualizarUI() {

    if (!this.ultimoTipo) {
      this.status = 'Não iniciado';
      this.botaoTexto = 'Registrar Entrada';
      return;
    }

    if (this.ultimoTipo === 'ENTRADA') {
      this.status = 'Trabalhando';
      this.botaoTexto = 'Registrar Saída';
    } else {
      this.status = 'Fora do expediente';
      this.botaoTexto = 'Registrar Entrada';
    }
  }

  // =========================
  // BATER PONTO
  // =========================
  baterPonto() {

  let tipo: 'ENTRADA' | 'SAIDA';

  if (!this.ultimoTipo) {
    tipo = 'ENTRADA';
  } else {
    tipo = this.ultimoTipo === 'ENTRADA' ? 'SAIDA' : 'ENTRADA';
  }

  this.pontoService.baterPonto(tipo)
    .subscribe({
      next: () => {

        // 🔥 TOAST AQUI (DEPOIS DO BACKEND CONFIRMAR)
        this.toast.show(
          tipo === 'ENTRADA'
            ? 'Entrada registrada'
            : 'Saída registrada',
          'success'
        );

        this.carregarHistorico();
        this.carregarBancoHoras();
      },

      error: (err) => {
        console.error(err);

        this.toast.show(
          'Erro ao registrar ponto',
          'error'
        );
      }
    });
}

  // =========================
  // CSS DO BOTÃO
  // =========================
  getBotaoClasse() {

    if (!this.ultimoTipo) {
      return 'btn-azul';
    }

    if (this.ultimoTipo === 'SAIDA') {
      return 'btn-verde';
    }

    if (this.ultimoTipo === 'ENTRADA') {
      return 'btn-vermelho';
    }

    return 'btn-azul';
  }
}