import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(email: string): boolean {
    const users: User[] = [
      { id: 1, name: 'Admin', email: 'admin@inteligreen.com', role: 'admin' },
      { id: 2, name: 'Ventas', email: 'ventas@inteligreen.com', role: 'ventas' }
    ];

    const user = users.find(u => u.email === email);

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
