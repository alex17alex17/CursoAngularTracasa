import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { BusquedaExpedientes } from '../../Components/busqueda-expedientes/busqueda-expedientes';
import { AltaExpediente } from '../../Components/alta-expediente/alta-expediente';
import { EdicionExpediente } from '../../Components/edicion-expediente/edicion-expediente';
import { FiltrosBusqueda } from '../../models/expediente-busqueda';
import { ExpedienteClientService } from '../../services/expediente-client-service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-expedientes-page',
  imports: [BusquedaExpedientes, AltaExpediente, EdicionExpediente],
  templateUrl: './expedientes-page.html',
  styleUrl: './expedientes-page.css',
})
export class ExpedientesPage {
  servicioExpediente = inject(ExpedienteClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  filtros = signal<FiltrosBusqueda>({
    texto: '',
    estado: '',
    prioridad: '',
    fechaDesde: '',
    fechaHasta: '',
  });

  recursoCambioFiltro = rxResource({
    params: () => this.filtros(),
    stream: ({ params }) => this.servicioExpediente.getExpedientes(params),
  });

  cargandoExpedientes = this.recursoCambioFiltro.isLoading;
  errorExpedientes = this.recursoCambioFiltro.error;
  respuestaExpedientes = this.recursoCambioFiltro.value;
  listaExpedientes = computed(() => this.respuestaExpedientes() ?? []);

  aplicarFiltro(filtros: FiltrosBusqueda): void {
    this.filtros.set({ ...filtros });
  }
}
