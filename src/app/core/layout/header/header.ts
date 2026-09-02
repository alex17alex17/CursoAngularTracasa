import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);

  autenticado = this.authService.estaAutenticado;
  esEditor = this.authService.esUsuarioEditor;
  nombreUsuarioAutenticado = this.authService.nombreUsuarioAutenticado;

  logout = output();
}
