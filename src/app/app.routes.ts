import { Routes } from '@angular/router';
import { AltaExpediente } from './features/Expedientes/Components/alta-expediente/alta-expediente';
import { EdicionExpediente } from './features/Expedientes/Components/edicion-expediente/edicion-expediente';
import { NotFoundPage } from './core/layout/not-found-page/not-found-page';
import { ExpedientesPage } from './features/Expedientes/pages/expedientes-page/expedientes-page';
import { LoginPage } from './features/Auth/pages/login-page/login-page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'expedienteAlta', component: AltaExpediente },
  { path: 'expedienteBusqueda', component: ExpedientesPage },
  { path: 'expedienteEdicion/:id', component: EdicionExpediente },
  { path: '**', component: NotFoundPage },
];
