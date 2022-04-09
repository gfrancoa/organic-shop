import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, take, map } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  //PUBLIC METHODS
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    //to get the cart
    let cart$ = this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges() as Observable<any>;

    return cart$.pipe(
      map((x) => {
        console.log('this is the map', x);
        return new Cart(x.items);
      })
    );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);

    //CODE REFACTORING
    // if (item != null) {
    //   itemObject.update({ quantity: item.quantity + 1 });
    // } else {
    //   itemObject.set({ product: product, quantity: 1 });
    // }
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  //PRIVATE METHODS

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;
    //else:
    let result = await this.create();
    //guardando el id de carrito en local storage para futuras referencias
    localStorage.setItem('cartId', result.key as string);
    return result.key as string;
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let itemObject = this.getItem(cartId, product.key as string);

    (itemObject.valueChanges() as Observable<any>)
      .pipe(take(1))
      .subscribe((item) => {
        let quantity = (item?.quantity || 0) + change;
        if (quantity === 0) itemObject.remove();
        // console.log('the item from obs cart', item);
        else
          itemObject.update({
            product: product,
            quantity: quantity,
          });
      });
  }
}
