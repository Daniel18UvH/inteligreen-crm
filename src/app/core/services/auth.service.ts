// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Simulación de base de datos local
  private users: User[] = [
    { id: 1, name: 'Admin Inteligreen', email: 'admin@inteligreen.com', role: 'admin' },
    { id: 2, name: 'Asesor de Ventas', email: 'ventas@inteligreen.com', role: 'ventas' }
  ];

  login(email: string): boolean {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}