import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {

  mensagem = '';
  tipo: 'success' | 'error' | 'info' = 'success';
  visivel = false;

  private timeout: any;

  show(msg: string, tipo: 'success' | 'error' | 'info' = 'success') {
    this.mensagem = msg;
    this.tipo = tipo;
    this.visivel = true;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.visivel = false;
    }, 2500);
  }

  fechar() {
    this.visivel = false;
    clearTimeout(this.timeout);
  }
}