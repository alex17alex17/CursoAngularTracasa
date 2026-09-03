import { Routes } from '@angular/router';
import { AltaExpediente } from './Components/alta-expediente/alta-expediente';
import { ExpedientesPage } from './pages/expedientes-page/expedientes-page';

export const routes: Routes = [
  { path: 'expedienteAlta', component: AltaExpediente },
  { path: 'expedienteEdicion/:id', component: ExpedientesPage },
];
