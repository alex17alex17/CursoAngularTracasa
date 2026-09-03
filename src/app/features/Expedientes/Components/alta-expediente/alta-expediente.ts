import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, pattern, required } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-expediente',
  imports: [FormField, FormRoot],
  templateUrl: './alta-expediente.html',
  styleUrl: './alta-expediente.css',
})
export class AltaExpediente {
  private readonly router = inject(Router);

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

  altaForm = form(this.altaModel, (schemaPath) => {
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
    required(schemaPath.unidad, { message: 'La unidad es obligatoria' });
  });

  cancelar(): void {
    this.router.navigate(['expedienteBusqueda']);
  }
}
