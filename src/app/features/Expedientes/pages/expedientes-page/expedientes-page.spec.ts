import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ExpedienteClientService } from '../../services/expediente-client-service';
import { ExpedientesPage } from './expedientes-page';

describe('ExpedientesPage', () => {
  let component: ExpedientesPage;
  let fixture: ComponentFixture<ExpedientesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesPage],
      providers: [
        provideRouter([]),
        {
          provide: ExpedienteClientService,
          useValue: {
            getExpedientes: () => of({ datos: [], total: 0 }),
            eliminarExpediente: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpedientesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
