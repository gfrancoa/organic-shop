import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return [
      this.db.list('/products').valueChanges() as Observable<any[]>,
      this.db.list('/products').snapshotChanges() as Observable<any[]>,
    ];
  }

  get(productId: any) {
    return this.db
      .object('/products/' + productId)
      .valueChanges() as Observable<any>;
  }

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }
}
