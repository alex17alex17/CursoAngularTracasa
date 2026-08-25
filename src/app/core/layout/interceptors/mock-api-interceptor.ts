import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { of } from 'rxjs';
import { EXPEDIENTES_MOCK } from '../../../features/Expedientes/data/expediente-mock';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/api/expedientes') {
    return of(
      new HttpResponse({
        status: 200,
        body: EXPEDIENTES_MOCK,
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
