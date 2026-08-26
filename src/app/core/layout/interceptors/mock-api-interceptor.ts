import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { of } from 'rxjs';
import { EXPEDIENTES_MOCK } from '../../../features/Expedientes/data/expediente-mock';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/api/expedientes') {
    const texto = req.params.get('texto')?.toLowerCase().trim() ?? '';
    const estado = req.params.get('estado') ?? '';
    const prioridad = req.params.get('prioridad') ?? '';
    const fechaDesde = req.params.get('fechaDesde') ?? '';
    const fechaHasta = req.params.get('fechaHasta') ?? '';

    const expedientesFiltrados = EXPEDIENTES_MOCK.filter((expediente) => {
      const fechaAlta = expediente.fechaAlta.toISOString().slice(0, 10);
      const coincideTexto =
        !texto ||
        expediente.numero.toLowerCase().includes(texto) ||
        expediente.titulo.toLowerCase().includes(texto);

      return (
        coincideTexto &&
        (!estado || expediente.estado === estado) &&
        (!prioridad || expediente.prioridad === prioridad) &&
        (!fechaDesde || fechaAlta >= fechaDesde) &&
        (!fechaHasta || fechaAlta <= fechaHasta)
      );
    });

    return of(
      new HttpResponse({
        status: 200,
        body: expedientesFiltrados,
      }),
    );
  }

  const expedienteDetalleMatch =
    req.method === 'GET' ? req.url.match(/^\/api\/expedientes\/([^/]+)$/) : null;

  if (expedienteDetalleMatch) {
    const numero = expedienteDetalleMatch[1];
    const expediente = EXPEDIENTES_MOCK.find((exp) => exp.numero === numero);

    if (!expediente) {
      return of(
        new HttpResponse({
          status: 404,
          body: null,
        }),
      );
    }

    return of(
      new HttpResponse({
        status: 200,
        body: expediente,
      }),
    );
  }

  return next(req);
};
