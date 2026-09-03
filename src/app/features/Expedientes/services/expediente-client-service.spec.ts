import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { Expediente } from '../models/expediente-interface';
import { ExpedienteClientService } from './expediente-client-service';

describe('ExpedienteClient', () => {
  let service: ExpedienteClientService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExpedienteClientService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create the service', () => {
    // Arrange: the service is created in beforeEach.

    // Act: the test accesses the service instance.

    // Assert: the service exists.
    expect(service).toBeTruthy();
  });

  it('should get expedientes with filters and pagination', async () => {
    // Arrange: define the filters and pagination values for the request.
    const filtros = {
      texto: 'contrato',
      estado: '',
      prioridad: 'alta',
      fechaDesde: '',
      fechaHasta: '',
    };

    // Act: call the service method and capture the pending HTTP request.
    const respuestaPromise = firstValueFrom(service.getExpedientes(filtros, 2, 10));
    const request = httpTesting.expectOne(
      '/api/expedientes?texto=contrato&prioridad=alta&pagina=2&porPagina=10',
    );
    const expedientes: Expediente[] = [];

    // Assert: verify the HTTP request and simulate the backend response.
    expect(request.request.method).toBe('GET');
    request.flush(expedientes, {
      headers: { 'X-Total-Count': '12' },
    });

    // Assert: verify the service maps the body and total count correctly.
    await expect(respuestaPromise).resolves.toEqual({ datos: expedientes, total: 12 });
  });

  it('should delete an expediente', async () => {
    // Arrange: define the expediente number to delete.
    const numero = 'EXP-2026-1';

    // Act: call the delete method and capture the pending HTTP request.
    const respuestaPromise = firstValueFrom(service.eliminarExpediente(numero));
    const request = httpTesting.expectOne(`/api/expedientes/${numero}`);

    // Assert: verify the HTTP method and simulate an empty backend response.
    expect(request.request.method).toBe('DELETE');
    request.flush(null);

    // Assert: verify the Observable completes with the expected value.
    await expect(respuestaPromise).resolves.toBeNull();
  });

  it('should update an expediente', async () => {
    // Arrange: create the expediente that will be sent to the backend.
    const expediente = crearExpediente();

    // Act: call the update method and capture the pending HTTP request.
    const respuestaPromise = firstValueFrom(service.actualizarExpediente(expediente));
    const request = httpTesting.expectOne('/api/expedientes/EXP-2026-1');

    // Assert: verify the method and request body, then simulate the response.
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(expediente);
    request.flush(expediente);

    // Assert: verify the Observable emits the updated expediente.
    await expect(respuestaPromise).resolves.toEqual(expediente);
  });

  it('should create an expediente', async () => {
    // Arrange: create the expediente that will be sent to the backend.
    const expediente = crearExpediente();

    // Act: call the create method and capture the pending HTTP request.
    const respuestaPromise = firstValueFrom(service.crearExpediente(expediente));
    const request = httpTesting.expectOne('/api/expedientes');

    // Assert: verify the method and request body, then simulate the response.
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(expediente);
    request.flush(expediente);

    // Assert: verify the Observable emits the created expediente.
    await expect(respuestaPromise).resolves.toEqual(expediente);
  });
});

function crearExpediente(): Expediente {
  return {
    numero: 'EXP-2026-1',
    titulo: 'Contrato de prueba',
    estado: 'abierto',
    prioridad: 'alta',
    fechaAlta: new Date('2026-01-01'),
    fechaVencimiento: new Date('2026-12-31'),
    solicitante: 'Usuario de prueba',
    unidad: 'Administración',
    descripcion: 'Expediente utilizado en las pruebas',
  };
}
