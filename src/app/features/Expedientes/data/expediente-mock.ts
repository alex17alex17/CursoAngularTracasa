import { Expediente } from '../models/expediente-interface';

export const EXPEDIENTES_MOCK: Expediente[] = [
  {
    numero: 'EXP-2026-00124',
    titulo: 'Rehabilitación del edificio municipal',
    estado: 'En trámite',
    prioridad: 'Alta',
    fechaAlta: '12/01/2026',
    fechaBaja: '-',
  },
  {
    numero: 'EXP-2026-00118',
    titulo: 'Solicitud de licencia de actividad',
    estado: 'Pendiente',
    prioridad: 'Media',
    fechaAlta: '08/01/2026',
    fechaBaja: '-',
  },
  {
    numero: 'EXP-2025-00987',
    titulo: 'Mantenimiento de zonas verdes',
    estado: 'Finalizado',
    prioridad: 'Baja',
    fechaAlta: '15/11/2025',
    fechaBaja: '20/12/2025',
  },
  {
    numero: 'EXP-2025-00952',
    titulo: 'Subvención para actividades culturales',
    estado: 'En revisión',
    prioridad: 'Media',
    fechaAlta: '03/10/2025',
    fechaBaja: '-',
  },
  {
    numero: 'EXP-2025-00876',
    titulo: 'Autorización de ocupación de vía pública',
    estado: 'Finalizado',
    prioridad: 'Alta',
    fechaAlta: '24/09/2025',
    fechaBaja: '02/10/2025',
  },
];
