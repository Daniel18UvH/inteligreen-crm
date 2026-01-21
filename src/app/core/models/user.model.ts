export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'ventas' | 'junior';
}

export interface Log {
  userId: number;
  userName: string;
  action: string;
  timestamp: Date;
  details: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  nivel: 'Normal' | 'Importante';
  estado: string;
}