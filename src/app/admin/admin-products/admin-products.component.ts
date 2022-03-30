import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productIds: any[] = [];
  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;
  page = 1;
  pageSize = 10;

  constructor(private productService: ProductService) {
    // this.products$ = this.productService.getAll()[0];
    this.subscription1 = this.productService
      .getAll()[0]
      .subscribe((prod) => (this.filteredProducts = this.products = prod));
    this.subscription2 = this.productService
      .getAll()[1]
      .subscribe((ids) => (this.productIds = ids));
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    // console.log('query', query);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
