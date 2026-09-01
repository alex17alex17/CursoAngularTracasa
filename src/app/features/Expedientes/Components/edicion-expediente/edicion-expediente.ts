import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Expediente } from '../../models/expediente-interface';

@Component({
  selector: 'app-edicion-expediente',
  imports: [],
  templateUrl: './edicion-expediente.html',
  styleUrl: './edicion-expediente.css',
})
export class EdicionExpediente {
  expediente = signal<Expediente | null>(history.state.expediente ?? null);

  constructor(private router: Router) {}

  fechaComoTexto(fecha: Date | undefined): string {
    return fecha ? fecha.toISOString().slice(0, 10) : '';
  }

  cancelar(): void {
    this.router.navigate(['expedienteBusqueda']);
  }

  eliminarExpediente(): void {
    this.router.navigate(['expedienteBusqueda'], {
      state: {
        eliminarSolicitado: true,
        expediente: this.expediente(),
      },
    });
  }
}
