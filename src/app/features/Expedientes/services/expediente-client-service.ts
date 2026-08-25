import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ExpedienteResponse } from '../models/expediente-interface';
import { Observable } from 'rxjs';

@Service()
export class ExpedienteClientService {
  private httpClient = inject(HttpClient);

  getExpedientes(): Observable<ExpedienteResponse> {
    return this.httpClient.get<ExpedienteResponse>('/api/expedientes');
  }
}
