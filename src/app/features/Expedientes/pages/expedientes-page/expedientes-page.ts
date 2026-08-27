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
  porPagina = 5;

  filtros = toSignal(
    this.route.queryParamMap.pipe(
      map((params): FiltrosBusqueda => ({
        texto: params.get('texto') ?? '',
        estado: params.get('estado') ?? '',
        prioridad: params.get('prioridad') ?? '',
        fechaDesde: params.get('fechaDesde') ?? '',
        fechaHasta: params.get('fechaHasta') ?? '',
      })),
    ),
    {
      initialValue: {
        texto: '',
        estado: '',
        prioridad: '',
        fechaDesde: '',
        fechaHasta: '',
      },
    },
  );

  numeroPagina = toSignal(
    this.route.queryParamMap.pipe(map((params) => Number(params.get('pagina')) || 1)),
    { initialValue: 1 },
  );

  recursoCambioFiltro = rxResource({
    params: () => ({ filtros: this.filtros(), pagina: this.numeroPagina() }),
    stream: ({ params }) =>
      this.servicioExpediente.getExpedientes(params.filtros, params.pagina, this.porPagina),
  });

  cargandoExpedientes = this.recursoCambioFiltro.isLoading;
  errorExpedientes = this.recursoCambioFiltro.error;
  respuestaExpedientes = this.recursoCambioFiltro.value;
  listaExpedientes = computed(() => this.respuestaExpedientes()?.datos ?? []);
  totalPaginas = computed(() =>
    Math.max(1, Math.ceil((this.respuestaExpedientes()?.total ?? 0) / this.porPagina)),
  );

  aplicarFiltro(filtros: FiltrosBusqueda): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        texto: filtros.texto || null,
        estado: filtros.estado || null,
        prioridad: filtros.prioridad || null,
        fechaDesde: filtros.fechaDesde || null,
        fechaHasta: filtros.fechaHasta || null,
        pagina: 1,
      },
    });
  }

  cambiarPagina(numeroPagina: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: numeroPagina },
      queryParamsHandling: 'merge',
    });
  }
}
