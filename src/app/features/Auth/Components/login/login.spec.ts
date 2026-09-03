import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/Services/auth-service';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            login: () => of({ token: 'token', user: 'usuario', rol: 'LECTOR' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable login when user and password are empty', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(submitButton.disabled).toBe(true);
  });

  it('should enable login when user and password are filled', async () => {
    const userInput = fixture.nativeElement.querySelector('#user');
    const passwordInput = fixture.nativeElement.querySelector('#pass');

    userInput.value = 'usuario';
    userInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'contraseña';
    passwordInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(submitButton.disabled).toBe(false);
  });
});
