import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosBusqueda } from '../../models/expediente-busqueda';
import { Expediente } from '../../models/expediente-interface';
import { BusquedaExpedientesPaginacion } from '../busqueda-expedientes-paginacion/busqueda-expedientes-paginacion';

@Component({
  selector: 'app-busqueda-expedientes',
  imports: [FormsModule, BusquedaExpedientesPaginacion],
  templateUrl: './busqueda-expedientes.html',
  styleUrl: './busqueda-expedientes.css',
})
export class BusquedaExpedientes {
  expedientesTabla = input<Expediente[] | null>();
  numeroPagina = input(1);
  totalPaginas = input(1);
  filtroTabla = output<FiltrosBusqueda>();
  cambioPagina = output<number>();

  filtros: FiltrosBusqueda = {
    texto: '',
    estado: '',
    prioridad: '',
    fechaDesde: '',
    fechaHasta: '',
  };

  buscarExpedientes(): void {
    this.filtroTabla.emit(this.filtros);
  }

  limpiarFiltros(): void {
    this.filtros = {
      texto: '',
      estado: '',
      prioridad: '',
      fechaDesde: '',
      fechaHasta: '',
    };

    this.filtroTabla.emit(this.filtros);
  }
}
