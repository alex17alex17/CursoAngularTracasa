import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaExpediente } from './alta-expediente';

describe('AltaExpediente', () => {
  let component: AltaExpediente;
  let fixture: ComponentFixture<AltaExpediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaExpediente],
    }).compileComponents();

    fixture = TestBed.createComponent(AltaExpediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
