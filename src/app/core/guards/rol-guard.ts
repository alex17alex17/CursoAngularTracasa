import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { inject } from '@angular/core';

export const rolGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.esUsuarioEditor();
};
