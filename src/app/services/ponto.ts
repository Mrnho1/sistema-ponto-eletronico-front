import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroPonto } from '../models/registro-ponto';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  baterPonto(tipo: string) {
    return this.http.post(`${this.api}/pontos`, { tipo });
  }

  getRelatorio(inicio: string, fim: string) {
    return this.http.get(`${this.api}/banco-horas/relatorio?inicio=${inicio}&fim=${fim}`);
  }

  getBancoHoras() {
    return this.http.get(`${this.api}/banco-horas/me`);
  }

  getHoje(): Observable<RegistroPonto[]> {
  return this.http.get<RegistroPonto[]>(`${this.api}/pontos/hoje`);
  }
  getUltimo() {
  return this.http.get('http://localhost:8080/pontos/ultimo');
}
}