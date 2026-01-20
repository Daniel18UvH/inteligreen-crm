// src/app/features/auth/login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  styles: [`
    .login-screen {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #8bc34a 0%, #a2d149 100%);
    }
    .login-card {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      text-align: center;
      width: 350px;
    }
    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #4a69bd;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }
  `],
  template: `
    <div class="login-screen">
      <div class="login-card">
        <h2 style="color: #333;">🌱 Inteligreen</h2>
        <p style="color: #666; font-size: 0.9rem;">Sistema de Gestión</p>
        <input #email type="email" placeholder="Correo electrónico" (keyup.enter)="login(email.value)" />
        <button (click)="login(email.value)">Iniciar Sesión</button>
        <p style="font-size: 0.8rem; color: #888; margin-top: 15px;">Prueba con: admin@inteligreen.com</p>
      </div>
    </div>
  `
})
export default class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  login(email: string) {
    if (this.auth.login(email)) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Correo no registrado en Inteligreen');
    }
  }
}