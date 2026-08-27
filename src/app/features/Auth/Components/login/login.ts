import { Component, output, signal } from '@angular/core';
import { Credenciales } from '../../models/usuario-interface';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credencialesObtenidas = output<Credenciales>();

  loginModel = signal({
    usuario: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.usuario, { message: 'El usuario es obligatorio' });
    required(schemaPath.password, { message: 'La contraseña es obligatoria' });
  });

  onLogin(): void {
    this.credencialesObtenidas.emit({
      usuario: this.loginModel().usuario,
      password: this.loginModel().password,
    });
  }
}
