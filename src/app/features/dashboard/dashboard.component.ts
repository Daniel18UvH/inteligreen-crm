// src/app/features/dashboard/dashboard.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dashboard.component.css'],
  template: `
    <header class="navbar">
      <div class="logo">🌱 Inteligreen</div>
      <nav>
        <a>Contactos</a>
        <a>Proyectos</a>
        @if (user?.role === 'admin') {
          <a>Usuarios</a>
          <a>Descargas</a>
        }
      </nav>
      <button class="logout" (click)="logout()" title="Cerrar sesión">⎋</button>
    </header>

    <main class="container">
      <h2 class="title">Bienvenido, {{ user?.name || 'Usuario' }}</h2>

      <section class="cards">
        <div class="card green">
          <p>{{ user?.role === 'admin' ? 'Clientes Totales' : 'Mis Clientes Activos' }}</p>
          <h3>{{ user?.role === 'admin' ? '10,000' : '700' }}</h3>
        </div>

        @if (user?.role === 'admin') {
          <div class="card red">
            <p>Clientes Importantes</p>
            <h3>10,000</h3>
          </div>
        } @else {
          <div class="card red">
            <p>Mis Proyectos Abiertos</p>
            <h3>200</h3>
          </div>
        }

        <div class="card blue">
          <p>{{ user?.role === 'admin' ? 'Proyectos Abiertos' : 'Pasos Pendientes' }}</p>
          <h3>{{ user?.role === 'admin' ? '3,500' : '150' }}</h3>
        </div>
      </section>

      <section class="grid">
        <div class="box">
          <h3>{{ user?.role === 'admin' ? 'Últimos Clientes Agregados' : 'Mis Últimos Clientes' }}</h3>
          <div class="item">
            <div class="avatar"></div>
            <div>
              <strong>Jorge Estrada</strong>
              <p>4277897890</p>
              <span class="badge">Estado: Importante</span>
            </div>
          </div>
          <a class="more">Ver más...</a>
        </div>

        <div class="box">
          <h3>Últimas Modificaciones</h3>
          <div class="item">
            <div class="avatar"></div>
            <div>
              <strong>Customer1</strong>
              <p>Proyecto: Ceteo Company</p>
              <small>Acción: Actualización</small>
            </div>
          </div>
          <a class="more">Ver más...</a>
        </div>
      </section>
    </main>
  `
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = this.auth.getUser();

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}