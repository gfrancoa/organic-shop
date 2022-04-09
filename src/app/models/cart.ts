import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class Cart {
  dateCreated: number = new Date().getTime();
  items: ShoppingCartItem[] = []; //array of keys

  //no es necesario tener itemsMap expuesto porque no se está usando x fuera
  constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    if (!this.itemsMap) return 0;
    let item = this.itemsMap[product.key as any];

    return item ? item.quantity : 0;
  }
}
