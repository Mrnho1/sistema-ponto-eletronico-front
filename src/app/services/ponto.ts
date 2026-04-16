import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  baterPonto(tipo: 'ENTRADA' | 'SAIDA') {
  return this.http.post(`${this.api}/pontos`, { tipo });
}

  getHoje() {
    return this.http.get<any[]>(`${this.api}/pontos/hoje`);
  }

  getBancoHoras() {
    return this.http.get<any>(`${this.api}/banco-horas/me`);
  }
}