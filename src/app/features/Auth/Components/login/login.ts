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
    contraseña: '',
  };

  // 2. Función que se ejecuta al pulsar el botón "Ingresar"
  onLogin(): void {
    const { usuario, contraseña } = this.credentials;

    // Validación básica en el frontend
    if (usuario.trim() === '' || contraseña.trim() === '') {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    // Simulación de verificación de credenciales
    if (usuario === 'admin' && contraseña === '1234') {
      alert('¡Inicio de sesión correcto! Has accedido como EDITOR');
      // Aquí redirigirías al usuario a la página principal
    } else if (usuario === 'publico' && contraseña === '123') {
      alert('¡Inicio de sesión correcto! Has accedido como LECTOR');
      // Aquí redirigirías al usuario a la página principal
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
}
