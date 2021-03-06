import { Component, Input } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') p!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: any;
  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.p);
  }
}
