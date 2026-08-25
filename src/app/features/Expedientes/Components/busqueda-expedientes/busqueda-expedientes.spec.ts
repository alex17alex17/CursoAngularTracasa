import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaExpedientes } from './busqueda-expedientes';

describe('BusquedaExpedientes', () => {
  let component: BusquedaExpedientes;
  let fixture: ComponentFixture<BusquedaExpedientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaExpedientes],
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaExpedientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
