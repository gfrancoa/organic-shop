import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Subscription, switchMap } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productIds: any[] = [];
  filteredProducts: Product[] = [];
  category: any; //selected Category
  cart: any;
  subscription: Subscription | undefined;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    //getting the shopping cart

    productService
      .getAll()[0]
      .pipe(
        switchMap((prod) => {
          this.products = prod;
          return productService.getAll()[1];
        }),
        switchMap((ids) => {
          this.products = this.products.map((item, index) => {
            return { ...item, key: ids[index].key };
          });
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    let cart = await this.cartService.getCart();
    this.subscription = cart.subscribe((cart) => {
      console.log('the cart', cart);
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
