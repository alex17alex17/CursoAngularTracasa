import { Routes } from '@angular/router';
import { AltaExpediente } from './features/Expedientes/Components/alta-expediente/alta-expediente';
import { EdicionExpediente } from './features/Expedientes/Components/edicion-expediente/edicion-expediente';
import { NotFoundPage } from './core/layout/not-found-page/not-found-page';
import { ExpedientesPage } from './features/Expedientes/pages/expedientes-page/expedientes-page';
import { LoginPage } from './features/Auth/pages/login-page/login-page';
import { authGuard } from './core/guards/auth-guard';
import { rolGuard } from './core/guards/rol-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'expedienteAlta', component: AltaExpediente, canActivate: [authGuard, rolGuard] },
  { path: 'expedienteBusqueda', component: ExpedientesPage, canActivate: [authGuard] },
  {
    path: 'expedienteEdicion/:id',
    component: EdicionExpediente,
    canActivate: [authGuard, rolGuard],
  },
  { path: '**', component: NotFoundPage },
];
