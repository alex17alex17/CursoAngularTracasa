import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesPage } from './expedientes-page';

describe('ExpedientesPage', () => {
  let component: ExpedientesPage;
  let fixture: ComponentFixture<ExpedientesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpedientesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
