import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { rolGuard } from './core/guards/rol-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/Auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'expedienteBusqueda',
    loadComponent: () =>
      import('./features/Expedientes/pages/expedientes-page/expedientes-page').then(
        (m) => m.ExpedientesPage,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'expedienteAlta',
    loadComponent: () =>
      import('./features/Expedientes/Components/alta-expediente/alta-expediente').then(
        (m) => m.AltaExpediente,
      ),
    canActivate: [authGuard, rolGuard],
  },
  {
    path: 'expedienteEdicion/:id',
    loadComponent: () =>
      import('./features/Expedientes/Components/edicion-expediente/edicion-expediente').then(
        (m) => m.EdicionExpediente,
      ),
    canActivate: [authGuard, rolGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/layout/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
