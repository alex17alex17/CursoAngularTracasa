import { Routes } from '@angular/router';
import { Login } from './features/Auth/Components/login/login';
import { AltaExpediente } from './features/Expedientes/Components/alta-expediente/alta-expediente';
import { EdicionExpediente } from './features/Expedientes/Components/edicion-expediente/edicion-expediente';
import { NotFoundPage } from './core/layout/not-found-page/not-found-page';
import { ExpedientesPage } from './features/Expedientes/pages/expedientes-page/expedientes-page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'expedienteAlta', component: AltaExpediente },
  { path: 'expedienteBusqueda', component: ExpedientesPage },
  { path: 'expedienteEdicion', component: EdicionExpediente },
  { path: '**', component: NotFoundPage },
];
