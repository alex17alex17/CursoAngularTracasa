import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, pattern, required, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Expediente } from '../../models/expediente-interface';
import { ExpedienteClientService } from '../../services/expediente-client-service';

@Component({
  selector: 'app-alta-expediente',
  imports: [FormField, FormRoot],
  templateUrl: './alta-expediente.html',
  styleUrl: './alta-expediente.css',
})
export class AltaExpediente {
  private readonly router = inject(Router);
  private readonly servicioExpediente = inject(ExpedienteClientService);

  altaModel = signal({
    numero: '',
    estado: '',
    fechaAlta: '',
    solicitante: '',
    titulo: '',
    prioridad: '',
    fechaVencimiento: '',
    unidad: '',
    descripcion: '',
  });

  altaForm = form(
    this.altaModel,
    (schemaPath) => {
      required(schemaPath.numero, { message: 'El número es obligatorio' });
      pattern(schemaPath.numero, /^EXP-[0-9]{4}-[0-9]+$/, {
        message: 'El número debe tener el formato EXP-Año-Número',
      });
      required(schemaPath.estado, { message: 'El estado es obligatorio' });
      required(schemaPath.fechaAlta, { message: 'La fecha de alta es obligatoria' });
      required(schemaPath.solicitante, { message: 'El solicitante es obligatorio' });
      required(schemaPath.titulo, { message: 'El título es obligatorio' });
      required(schemaPath.prioridad, { message: 'La prioridad es obligatoria' });
      required(schemaPath.fechaVencimiento, {
        message: 'La fecha de vencimiento es obligatoria',
      });
      validate(schemaPath.fechaVencimiento, ({ value }) => {
        const fechaAlta = this.altaModel().fechaAlta;
        const fechaVencimiento = value();

        if (!fechaAlta || !fechaVencimiento || fechaVencimiento > fechaAlta) {
          return undefined;
        }

        return {
          kind: 'fecha-vencimiento-anterior',
          message: 'La fecha de vencimiento debe ser posterior a la fecha de alta',
        };
      });
      required(schemaPath.unidad, { message: 'La unidad es obligatoria' });
    },
    {
      submission: {
        action: async (model) => {
          const datos = model().value() as Omit<Expediente, 'fechaAlta' | 'fechaVencimiento'> & {
            fechaAlta: string;
            fechaVencimiento: string;
          };
          const expediente: Expediente = {
            ...datos,
            fechaAlta: new Date(datos.fechaAlta),
            fechaVencimiento: new Date(datos.fechaVencimiento),
          };

          await firstValueFrom(this.servicioExpediente.crearExpediente(expediente));
          this.router.navigate(['expedienteBusqueda']);
        },
      },
    },
  );

  cancelar(): void {
    this.router.navigate(['expedienteBusqueda']);
  }
}
