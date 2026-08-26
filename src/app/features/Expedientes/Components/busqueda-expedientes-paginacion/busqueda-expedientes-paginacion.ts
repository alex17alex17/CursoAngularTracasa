import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-busqueda-expedientes-paginacion',
  imports: [],
  templateUrl: './busqueda-expedientes-paginacion.html',
  styleUrl: './busqueda-expedientes-paginacion.css',
})
export class BusquedaExpedientesPaginacion {
  paginaActual = signal<number>(0);
}
