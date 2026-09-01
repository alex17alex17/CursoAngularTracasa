import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { BusquedaExpedientes } from '../../Components/busqueda-expedientes/busqueda-expedientes';
import { AltaExpediente } from '../../Components/alta-expediente/alta-expediente';
import { EdicionExpediente } from '../../Components/edicion-expediente/edicion-expediente';
import { FiltrosBusqueda } from '../../models/expediente-busqueda';
import { Expediente } from '../../models/expediente-interface';
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
  eliminarSolicitado = signal(false);
  expedienteAEliminar = signal<Expediente | null>(null);

  constructor() {
    const state = history.state as { eliminarSolicitado?: boolean; expediente?: Expediente } | null;

    if (state?.eliminarSolicitado) {
      this.eliminarSolicitado.set(true);
      this.expedienteAEliminar.set(state.expediente ?? null);
    }
  }

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

  editarExpediente(expediente: Expediente): void {
    this.router.navigate(['expedienteEdicion', expediente.numero], {
      state: { expediente },
    });
  }

  confirmarEliminacion(): void {
    const expediente = this.expedienteAEliminar();

    if (!expediente) {
      return;
    }

    console.log('Eliminar expediente solicitado:', expediente);
    this.eliminarSolicitado.set(false);
    this.expedienteAEliminar.set(null);
  }
}
