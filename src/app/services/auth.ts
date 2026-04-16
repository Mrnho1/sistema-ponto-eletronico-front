import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}