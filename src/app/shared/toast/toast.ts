import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';

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

  constructor(private cdr: ChangeDetectorRef) {}

  show(msg: string, tipo: 'success' | 'error' = 'success') {

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.mensagem = msg;
    this.tipo = tipo;
    this.visivel = true;

    this.cdr.detectChanges(); // 🔥 força aparecer

    this.timeout = setTimeout(() => {
      this.visivel = false;
      this.cdr.detectChanges(); // 🔥 força sumir
    }, 2500);
  }
}