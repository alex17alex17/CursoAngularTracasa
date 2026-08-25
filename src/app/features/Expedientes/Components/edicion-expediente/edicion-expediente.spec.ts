import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionExpediente } from './edicion-expediente';

describe('EdicionExpediente', () => {
  let component: EdicionExpediente;
  let fixture: ComponentFixture<EdicionExpediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionExpediente],
    }).compileComponents();

    fixture = TestBed.createComponent(EdicionExpediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
