import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header/header';
import { Footer } from './core/layout/footer/footer';
import { ExpedientesPage } from './features/Expedientes/pages/expedientes-page/expedientes-page';
import { AuthService } from './core/Services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpedientesPage, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Expedientes');

  authService = inject(AuthService);
  router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
