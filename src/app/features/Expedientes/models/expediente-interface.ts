export interface ExpedienteResponse {
  numero: string;
  titulo: string;
  estado: string;
  prioridad: string;
  fechaAlta: string;
  fechaVencimiento: string;
  solicitante: string;
  unidad: string;
  descripcion: string;
}

export interface Expediente {
  numero: string;
  titulo: string;
  estado: EstadoExpediente;
  prioridad: PrioridadExpediente;
  fechaAlta: Date;
  fechaVencimiento: Date;
  solicitante: string;
  unidad: string;
  descripcion: string;
}

export type EstadoExpediente = 'abierto' | 'cerrado' | 'en_proceso';
export type PrioridadExpediente = 'alta' | 'media' | 'baja';
