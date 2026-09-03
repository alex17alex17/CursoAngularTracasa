import {
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';

import { delay, Observable, of, throwError } from 'rxjs';
import { EXPEDIENTES_MOCK } from '../../../features/Expedientes/data/expediente-mock';
import {
  LoginRequest,
  LoginResponse,
  Rol,
  TokenPayload,
} from '../../../features/Auth/models/auth-interface';
import { Expediente } from '../../../features/Expedientes/models/expediente-interface';
import { generarToken, leerToken } from '../../Auth/token.utils';

const DURACION_SESION_MS = 15 * 60 * 1000;
const RETARDO_MS = 400;

interface UsuarioMock {
  user: string;
  pass: string;
  rol: Rol;
}

const USUARIOS: UsuarioMock[] = [
  { user: 'admin', pass: 'admin', rol: 'EDITOR' },
  { user: 'user', pass: 'user', rol: 'LECTOR' },
];

interface Permiso {
  patron: RegExp;
  metodos: string[];
  roles: Rol[];
}

const PERMISOS: Permiso[] = [
  // Listado/búsqueda de productos: ambos roles
  {
    patron: /^\/products(?:\/search)?(?:\?.*)?$/,
    metodos: ['GET'],
    roles: ['LECTOR', 'EDITOR'],
  },

  // Detalle de producto: solo EDITOR
  {
    patron: /^\/products\/\d+(?:\?.*)?$/,
    metodos: ['GET'],
    roles: ['EDITOR'],
  },

  // Clientes: listado/búsqueda solo EDITOR
  {
    patron: /^\/users(?:\/search)?(?:\?.*)?$/,
    metodos: ['GET'],
    roles: ['EDITOR'],
  },

  // Detalle cliente: solo EDITOR
  {
    patron: /^\/users\/\d+(?:\?.*)?$/,
    metodos: ['GET'],
    roles: ['EDITOR'],
  },

  // Escritura de productos: solo EDITOR
  {
    patron: /^\/products(?:\/\d+)?(?:\?.*)?$/,
    metodos: ['POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['EDITOR'],
  },

  // Escritura de clientes: solo EDITOR
  {
    patron: /^\/users(?:\/\d+)?(?:\?.*)?$/,
    metodos: ['POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['EDITOR'],
  },

  {
    patron: /^\/api\/expedientes\/[^/]+$/,
    metodos: ['PUT', 'DELETE'],
    roles: ['EDITOR'],
  },
  {
    patron: /^\/api\/expedientes$/,
    metodos: ['POST'],
    roles: ['EDITOR'],
  },
];

function responder<T>(body: T, status = 200): Observable<HttpEvent<unknown>> {
  return of(new HttpResponse({ status, body })).pipe(delay(RETARDO_MS));
}

function error(status: number, mensaje: string, url: string): Observable<HttpEvent<unknown>> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status,
        statusText: mensaje,
        url,
        error: {
          status,
          message: mensaje,
        },
      }),
  ).pipe(delay(RETARDO_MS));
}

function rolesPermitidos(url: string, metodo: string): Rol[] | null {
  const regla = PERMISOS.find(
    (permiso) => permiso.patron.test(url) && permiso.metodos.includes(metodo),
  );

  return regla?.roles ?? null;
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/api/expedientes') {
    const texto = req.params.get('texto')?.toLowerCase().trim() ?? '';
    const estado = req.params.get('estado') ?? '';
    const prioridad = req.params.get('prioridad') ?? '';
    const fechaDesde = req.params.get('fechaDesde') ?? '';
    const fechaHasta = req.params.get('fechaHasta') ?? '';
    const pagina = Math.max(Number(req.params.get('pagina')) || 1, 1);
    const porPagina = Math.max(Number(req.params.get('porPagina')) || 5, 1);

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

    const inicio = (pagina - 1) * porPagina;
    const expedientesPagina = expedientesFiltrados.slice(inicio, inicio + porPagina);

    return of(
      new HttpResponse({
        status: 200,
        headers: new HttpHeaders({
          'X-Total-Count': String(expedientesFiltrados.length),
        }),
        body: expedientesPagina,
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

  //******************************INICIO AUTENTICACIÓN Y AUTORIZACIÓN
  const metodo = req.method.toUpperCase();
  var url = req.url;
  // LOGIN
  if (url === '/api/auth/login' && metodo === 'POST') {
    const credenciales = (req.body ?? {}) as Partial<LoginRequest>;

    const usuario = USUARIOS.find(
      (candidato) =>
        candidato.user === credenciales.user?.trim() && candidato.pass === credenciales.pass,
    );

    if (!usuario) {
      return error(401, 'Usuario o contraseña incorrectos', url);
    }

    const payload: TokenPayload = {
      user: usuario.user,
      rol: usuario.rol,
      exp: Date.now() + DURACION_SESION_MS,
    };

    const respuesta: LoginResponse = {
      token: generarToken(payload),
      user: usuario.user,
      rol: usuario.rol,
    };

    return responder(respuesta);
  }

  // AUTENTICACIÓN
  const autorizacion = req.headers.get('Authorization') ?? '';

  const payload = leerToken(autorizacion.startsWith('Bearer ') ? autorizacion.slice(7) : null);

  if (!payload) {
    return error(401, 'Sesión no válida o caducada', url);
  }

  // AUTORIZACIÓN
  const roles = rolesPermitidos(url, metodo);

  if (roles && !roles.includes(payload.rol)) {
    return error(403, `El rol ${payload.rol} no tiene permisos para ${metodo} ${url}`, url);
  }

  // PERFIL
  if (url === '/api/auth/perfil' && metodo === 'GET') {
    return responder({
      user: payload.user,
      rol: payload.rol,
    });
  }

  const expedienteEliminacionMatch =
    metodo === 'DELETE' ? url.match(/^\/api\/expedientes\/([^/]+)$/) : null;

  if (metodo === 'POST' && url === '/api/expedientes') {
    const nuevoExpediente = req.body as Expediente;

    if (EXPEDIENTES_MOCK.some((expediente) => expediente.numero === nuevoExpediente.numero)) {
      return error(409, 'Ya existe un expediente con ese número', url);
    }

    EXPEDIENTES_MOCK.push({
      ...nuevoExpediente,
      fechaAlta: new Date(nuevoExpediente.fechaAlta),
      fechaVencimiento: new Date(nuevoExpediente.fechaVencimiento),
    });

    return responder(nuevoExpediente, 201);
  }

  if (expedienteEliminacionMatch) {
    const numero = expedienteEliminacionMatch[1];
    const indice = EXPEDIENTES_MOCK.findIndex((expediente) => expediente.numero === numero);

    if (indice === -1) {
      return error(404, 'Expediente no encontrado', url);
    }

    EXPEDIENTES_MOCK.splice(indice, 1);
    return responder(null, 204);
  }

  const expedienteActualizacionMatch =
    metodo === 'PUT' ? url.match(/^\/api\/expedientes\/([^/]+)$/) : null;

  if (expedienteActualizacionMatch) {
    const numero = expedienteActualizacionMatch[1];
    const indice = EXPEDIENTES_MOCK.findIndex((expediente) => expediente.numero === numero);

    if (indice === -1) {
      return error(404, 'Expediente no encontrado', url);
    }

    const cambios = (req.body ?? {}) as Partial<Expediente>;
    const expedienteActualizado: Expediente = {
      ...EXPEDIENTES_MOCK[indice],
      ...cambios,
      numero,
      fechaAlta: cambios.fechaAlta
        ? new Date(cambios.fechaAlta)
        : EXPEDIENTES_MOCK[indice].fechaAlta,
      fechaVencimiento: cambios.fechaVencimiento
        ? new Date(cambios.fechaVencimiento)
        : EXPEDIENTES_MOCK[indice].fechaVencimiento,
    };

    EXPEDIENTES_MOCK[indice] = expedienteActualizado;
    return responder(expedienteActualizado);
  }

  return next(req);
};
