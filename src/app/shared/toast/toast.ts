import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  mensagem = '';
  tipo: 'success' | 'error' = 'success';
  visivel = false;

  private timeout: any;

  show(msg: string, tipo: 'success' | 'error' = 'success') {

    // 🔥 limpa timeout anterior
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.mensagem = msg;
    this.tipo = tipo;
    this.visivel = true;


    this.timeout = setTimeout(() => {
      this.visivel = false;
    }, 2500); // tempo ideal (2.5s)
  }
}
