import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credenciales } from '../../models/usuario-interface';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // 1. Objeto donde se guardan los campos del formulario

  credencialesObtenidas = output<Credenciales>();

  credentials: Credenciales = {
    usuario: '',
    password: '',
  };

  // 2. Función que se ejecuta al pulsar el botón "Ingresar"
  onLogin(): void {
    this.credencialesObtenidas.emit({
      usuario: this.credentials.usuario,
      password: this.credentials.password,
    });
  }
}
