import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <p>Bienvenido {{ user?.name }}</p>
    <button (click)="logout()">Cerrar sesión</button>
  `
})
export default class DashboardComponent {

  user = this.auth.getUser();

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
