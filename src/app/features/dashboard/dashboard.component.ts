import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';
import { Cliente } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private sanitizer = inject(DomSanitizer);

  user = this.auth.getUser();
  mapUrl!: SafeResourceUrl; 

  nuevoCliente: Partial<Cliente> = { nivel: 'Normal', estado: 'Prospecto' };
  clientesRaw: Cliente[] = [
    { id: 1, nombre: 'Residencial San Gil', telefono: '4271012030', correo: 'c@c.mx', direccion: 'SJR', nivel: 'Normal', estado: 'Seguimiento' },
    { id: 2, nombre: 'Empresa Valle Oro', telefono: '4279876543', correo: 'i@s.mx', direccion: 'SJR', nivel: 'Importante', estado: 'Instalación' }
  ];
  clientes: Cliente[] = [];

  ngOnInit() {
    // URL Pública para Plaza Oriente sin necesidad de API Key activa
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.1561!2d-99.9961!3d20.3889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDIzJzIwLjAiTiA5OcKwNTknNDYuMCJX!5e0!3m2!1ses!2smx!4v1700000000000'
    );
    this.actualizarVista();
  }

  actualizarVista() {
    this.clientes = this.user?.role === 'admin' 
      ? this.clientesRaw 
      : this.clientesRaw.filter(c => c.nivel === 'Normal');
  }

  agregarCliente() {
    if (this.nuevoCliente.nombre && this.nuevoCliente.telefono) {
      this.clientesRaw.unshift({ id: Date.now(), ...this.nuevoCliente } as Cliente);
      this.nuevoCliente = { nivel: 'Normal', estado: 'Prospecto' };
      this.actualizarVista();
    }
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}