import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portifolio-front');
}
