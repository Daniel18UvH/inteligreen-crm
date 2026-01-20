import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  template: `
    <h2>Inteligreen CRM</h2>
    <input #email placeholder="Correo" />
    <button (click)="login(email.value)">Entrar</button>
  `
})
export default class LoginComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(email: string) {
    if (this.auth.login(email)) {
      this.router.navigate(['/']);
    } else {
      alert('Usuario no válido');
    }
  }
}
