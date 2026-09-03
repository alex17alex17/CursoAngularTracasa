import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Expediente, ExpedientePageResponse } from '../models/expediente-interface';
import { FiltrosBusqueda } from '../models/expediente-busqueda';
import { map, Observable } from 'rxjs';

@Service()
export class ExpedienteClientService {
  private httpClient = inject(HttpClient);

  getExpedientes(
    filtros: FiltrosBusqueda,
    pagina = 1,
    porPagina = 5,
  ): Observable<ExpedientePageResponse> {
    let params = new HttpParams();

    for (const [nombre, valor] of Object.entries(filtros)) {
      if (valor) {
        params = params.set(nombre, valor);
      }
    }

    params = params.set('pagina', pagina).set('porPagina', porPagina);

    return this.httpClient
      .get<Expediente[]>('/api/expedientes', { params, observe: 'response' })
      .pipe(
        map(
          (respuesta): ExpedientePageResponse => ({
            datos: respuesta.body ?? [],
            total: Number(respuesta.headers.get('X-Total-Count')) || 0,
          }),
        ),
      );
  }

  eliminarExpediente(numero: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/expedientes/${numero}`);
  }

  actualizarExpediente(expediente: Expediente): Observable<Expediente> {
    return this.httpClient.put<Expediente>(
      `/api/expedientes/${expediente.numero}`,
      expediente,
    );
  }

  crearExpediente(expediente: Expediente): Observable<Expediente> {
    return this.httpClient.post<Expediente>('/api/expedientes', expediente);
  }
}
