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
    { id: 2, nombre: 'Scribe Industrial', telefono: '4279876543', correo: 'i@s.mx', direccion: 'SJR', nivel: 'Importante', estado: 'Instalación' }
  ];
  clientes: Cliente[] = [];

  ngOnInit() {
    const direccionExacta = "Av Río Moctezuma 172-Interior 8, San Cayetano, 76806 San Juan del Río, Qro.";
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccionExacta)}&output=embed`;
    
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapEmbedUrl);
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