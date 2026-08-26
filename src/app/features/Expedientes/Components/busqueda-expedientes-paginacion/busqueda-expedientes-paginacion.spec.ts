import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaExpedientesPaginacion } from './busqueda-expedientes-paginacion';

describe('BusquedaExpedientesPaginacion', () => {
  let component: BusquedaExpedientesPaginacion;
  let fixture: ComponentFixture<BusquedaExpedientesPaginacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaExpedientesPaginacion],
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaExpedientesPaginacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
