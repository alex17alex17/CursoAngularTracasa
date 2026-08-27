import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-busqueda-expedientes-paginacion',
  imports: [],
  templateUrl: './busqueda-expedientes-paginacion.html',
  styleUrl: './busqueda-expedientes-paginacion.css',
})
export class BusquedaExpedientesPaginacion {
  numeroPagina = input(1);
  totalPaginas = input(1);

  cambioPagina = output<number>();

  paginaAnterior(): void {
    if (this.numeroPagina() > 1) {
      this.cambioPagina.emit(this.numeroPagina() - 1);
    }
  }

  paginaSiguiente(): void {
    if (this.numeroPagina() < this.totalPaginas()) {
      this.cambioPagina.emit(this.numeroPagina() + 1);
    }
  }
}
