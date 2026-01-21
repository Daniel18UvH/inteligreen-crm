import { Injectable } from '@angular/core';
import { User, Log } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'Admin Inteligreen', email: 'admin@inteligreen.com', role: 'admin' },
    { id: 2, name: 'Asesor de Ventas', email: 'ventas@inteligreen.com', role: 'ventas' }
  ];

  login(email: string): boolean {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.registrarLog('LOGIN', 'Acceso al CRM');
      return true;
    }
    return false;
  }

  getUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    this.registrarLog('LOGOUT', 'Cierre de sesión');
    localStorage.removeItem('user');
  }

  registrarLog(accion: string, detalles: string) {
    const user = this.getUser();
    const log: Log = {
      userId: user?.id || 0,
      userName: user?.name || 'Sistema',
      action: accion,
      timestamp: new Date(),
      details: detalles
    };
    console.log('%c [AUDITORÍA]:', 'color: #8bc34a; font-weight: bold;', log);
  }
}