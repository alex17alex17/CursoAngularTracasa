import { Component } from '@angular/core';
import { BusquedaExpedientes } from '../../Components/busqueda-expedientes/busqueda-expedientes';
import { AltaExpediente } from '../../Components/alta-expediente/alta-expediente';
import { EdicionExpediente } from '../../Components/edicion-expediente/edicion-expediente';
import { EXPEDIENTES_MOCK } from '../../data/expediente-mock';
import { FiltrosBusqueda } from '../../models/expediente-busqueda';

@Component({
  selector: 'app-expedientes-page',
  imports: [BusquedaExpedientes, AltaExpediente, EdicionExpediente],
  templateUrl: './expedientes-page.html',
  styleUrl: './expedientes-page.css',
})
export class ExpedientesPage {
  listaExpedientes = EXPEDIENTES_MOCK;

  private convertirFecha(fecha: string): string {
    if (fecha === '-') {
      return '';
    }

    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
  }

  aplicarFiltro(filtros: FiltrosBusqueda): void {
    const texto = filtros.texto.toLowerCase().trim();

    this.listaExpedientes = EXPEDIENTES_MOCK.filter((expediente) => {
      const coincideTexto =
        !texto ||
        expediente.numero.toLowerCase().includes(texto) ||
        expediente.titulo.toLowerCase().includes(texto);

      const coincideEstado = !filtros.estado || expediente.estado === filtros.estado;

      const coincidePrioridad = !filtros.prioridad || expediente.prioridad === filtros.prioridad;

      const coincideFechaDesde =
        !filtros.fechaDesde || this.convertirFecha(expediente.fechaAlta) >= filtros.fechaDesde;

      const coincideFechaHasta =
        !filtros.fechaHasta || this.convertirFecha(expediente.fechaAlta) <= filtros.fechaHasta;

      return (
        coincideTexto &&
        coincideEstado &&
        coincidePrioridad &&
        coincideFechaDesde &&
        coincideFechaHasta
      );
    });
  }
}
