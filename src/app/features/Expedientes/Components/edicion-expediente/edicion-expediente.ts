import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expediente } from '../../models/expediente-interface';
import { ExpedienteClientService } from '../../services/expediente-client-service';

@Component({
  selector: 'app-edicion-expediente',
  imports: [FormsModule],
  templateUrl: './edicion-expediente.html',
  styleUrl: './edicion-expediente.css',
})
export class EdicionExpediente {
  expediente = signal<Expediente | null>(history.state.expediente ?? null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicioExpediente: ExpedienteClientService,
  ) {}

  fechaComoTexto(fecha: Date | undefined): string {
    return fecha ? fecha.toISOString().slice(0, 10) : '';
  }

  cancelar(): void {
    this.router.navigate(['expedienteBusqueda'], {
      queryParams: this.route.snapshot.queryParams,
    });
  }

  guardarExpediente(formulario: NgForm): void {
    const expedienteOriginal = this.expediente();

    if (!expedienteOriginal || formulario.invalid) {
      return;
    }

    const datos = formulario.value as Omit<
      Expediente,
      'numero' | 'fechaAlta' | 'fechaVencimiento'
    > & {
      fechaAlta: string;
      fechaVencimiento: string;
    };

    const expedienteActualizado: Expediente = {
      ...expedienteOriginal,
      ...datos,
      fechaAlta: new Date(datos.fechaAlta),
      fechaVencimiento: new Date(datos.fechaVencimiento),
    };

    this.servicioExpediente.actualizarExpediente(expedienteActualizado).subscribe({
      next: (expedienteGuardado) =>
        this.router.navigate(['expedienteBusqueda'], {
          queryParams: this.route.snapshot.queryParams,
          state: { expedienteActualizado: expedienteGuardado },
        }),
    });
  }

  eliminarExpediente(): void {
    this.router.navigate(['expedienteBusqueda'], {
      queryParams: this.route.snapshot.queryParams,
      state: {
        eliminarSolicitado: true,
        expediente: this.expediente(),
      },
    });
  }
}
