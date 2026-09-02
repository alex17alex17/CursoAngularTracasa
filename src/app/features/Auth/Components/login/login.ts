import { Component, inject, output, signal } from '@angular/core';
import { Credenciales } from '../../models/usuario-interface';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/Services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credencialesObtenidas = output<Credenciales>();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  loginModel = signal({
    user: '',
    pass: '',
  });

  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.user, { message: 'El usuario es obligatorio' });
      required(schemaPath.pass, { message: 'La contraseña es obligatoria' });
    },
    {
      submission: {
        action: async (model) => {
          try {
            await firstValueFrom(this.authService.login(model().value()));
            const urlPrevia =
              this.route.snapshot.queryParamMap.get('urlActual') ?? '/expedienteBusqueda';
            this.router.navigate([urlPrevia]);
            return;
          } catch (error) {
            return {
              kind: 'credentials',
              message: 'Contraseña o usuario incorrectos',
              fieldTree: model.pass,
            };
          }
        },
      },
    },
  );

  onLogin(): void {
    this.credencialesObtenidas.emit({
      usuario: this.loginModel().user,
      password: this.loginModel().pass,
    });
  }
}
