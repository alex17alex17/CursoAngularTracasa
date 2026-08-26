import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Expediente } from '../models/expediente-interface';
import { FiltrosBusqueda } from '../models/expediente-busqueda';
import { Observable } from 'rxjs';

@Service()
export class ExpedienteClientService {
  private httpClient = inject(HttpClient);

  getExpedientes(filtros: FiltrosBusqueda): Observable<Expediente[]> {
    let params = new HttpParams();

    for (const [nombre, valor] of Object.entries(filtros)) {
      if (valor) {
        params = params.set(nombre, valor);
      }
    }

    return this.httpClient.get<Expediente[]>('/api/expedientes', { params });
  }
}
