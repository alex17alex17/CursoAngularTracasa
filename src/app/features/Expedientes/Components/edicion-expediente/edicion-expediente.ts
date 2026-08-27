import { Component, signal } from '@angular/core';
import { Expediente } from '../../models/expediente-interface';

@Component({
  selector: 'app-edicion-expediente',
  imports: [],
  templateUrl: './edicion-expediente.html',
  styleUrl: './edicion-expediente.css',
})
export class EdicionExpediente {
  expediente = signal<Expediente | null>(history.state.expediente ?? null);

  fechaComoTexto(fecha: Date | undefined): string {
    return fecha ? fecha.toISOString().slice(0, 10) : '';
  }
}
