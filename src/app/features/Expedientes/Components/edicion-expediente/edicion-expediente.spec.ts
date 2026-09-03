import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ExpedienteClientService } from '../../services/expediente-client-service';
import { EdicionExpediente } from './edicion-expediente';

describe('EdicionExpediente', () => {
  let component: EdicionExpediente;
  let fixture: ComponentFixture<EdicionExpediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionExpediente],
      providers: [
        provideRouter([]),
        {
          provide: ExpedienteClientService,
          useValue: {
            actualizarExpediente: () => of(null),
            eliminarExpediente: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdicionExpediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
