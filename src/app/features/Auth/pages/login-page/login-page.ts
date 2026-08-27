import { Component, inject, signal } from '@angular/core';
import { Credenciales } from '../../models/usuario-interface';
import { Router } from '@angular/router';
import { Login } from '../../Components/login/login';

@Component({
  selector: 'app-login-page',
  imports: [Login],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  router = inject(Router);

  onLogin(credenciales: Credenciales): void {
    // Validación básica en el frontend
    if (credenciales.usuario.trim() === '' || credenciales.password.trim() === '') {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    // Simulación de verificación de credenciales
    if (credenciales.usuario === 'admin' && credenciales.password === '1234') {
      alert('¡Inicio de sesión correcto! Has accedido como EDITOR');
      this.router.navigate(['expedienteBusqueda']); // Redirige a la página de expedientes
      // Aquí redirigirías al usuario a la página principal
    } else if (credenciales.usuario === 'publico' && credenciales.password === '123') {
      alert('¡Inicio de sesión correcto! Has accedido como LECTOR');
      this.router.navigate(['expedienteBusqueda']); // Redirige a la página de expedientes
      // Aquí redirigirías al usuario a la página principal
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
    // Aquí puedes realizar la lógica de autenticación con las credenciales obtenidas
    console.log('Credenciales obtenidas:', credenciales.usuario, credenciales.password);
  }
}
