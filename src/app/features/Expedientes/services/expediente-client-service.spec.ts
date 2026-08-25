import { TestBed } from '@angular/core/testing';

import { ExpedienteClientService } from './expediente-client-service';

describe('ExpedienteClient', () => {
  let service: ExpedienteClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
