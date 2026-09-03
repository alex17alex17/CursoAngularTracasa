import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FiltrosBusqueda } from '../../models/expediente-busqueda';
import { Expediente } from '../../models/expediente-interface';
import { BusquedaExpedientesPaginacion } from '../busqueda-expedientes-paginacion/busqueda-expedientes-paginacion';

@Component({
  selector: 'app-busqueda-expedientes',
  imports: [
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BusquedaExpedientesPaginacion,
  ],
  templateUrl: './busqueda-expedientes.html',
  styleUrl: './busqueda-expedientes.css',
})
export class BusquedaExpedientes {
  private router = inject(Router);
  expedientesTabla = input<Expediente[] | null>();
  numeroPagina = input(1);
  totalPaginas = input(1);
  filtroTabla = output<FiltrosBusqueda>();
  cambioPagina = output<number>();
  expedienteSeleccionado = output<Expediente>();
  readonly displayedColumns = [
    'numero',
    'titulo',
    'descripcion',
    'estado',
    'prioridad',
    'fechaAlta',
    'fechaVencimiento',
  ];

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

  darDeAltaExpediente(): void {
    this.router.navigate(['expedienteAlta']);
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
