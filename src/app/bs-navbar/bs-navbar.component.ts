import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { Cart } from '../models/cart';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  appUser!: AppUser;
  // shoppingCartItemCount: number = 0;
  cart$: Observable<Cart> | undefined;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    // No se necesita desuscribir porque este componente se crea una sola vez
    //en la app y necesitamos estar pendientes a cualquier cambio
    this.auth.appUser$.subscribe(
      (appUser) => (this.appUser = appUser as AppUser)
    );
    this.cart$ = await this.cartService.getCart();
  }
}
