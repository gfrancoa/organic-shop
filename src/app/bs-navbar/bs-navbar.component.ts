import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  appUser!: AppUser;
  constructor(private auth: AuthService) {
    // No se necesita desuscribir porque este componente se crea una sola vez
    //en la app y necesitamos estar pendientes a cualquier cambio
    auth.appUser$.subscribe((appUser) => (this.appUser = appUser as AppUser));
  }

  logout() {
    this.auth.logout();
  }
}
