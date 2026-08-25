import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosBusqueda } from '../../models/expediente-busqueda';
import { Expediente, ExpedienteResponse } from '../../models/expediente-interface';

@Component({
  selector: 'app-busqueda-expedientes',
  imports: [FormsModule],
  templateUrl: './busqueda-expedientes.html',
  styleUrl: './busqueda-expedientes.css',
})
export class BusquedaExpedientes {
  expedientesTabla = input<ExpedienteResponse[] | null>([]);
  filtroTabla = output<FiltrosBusqueda>();

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
