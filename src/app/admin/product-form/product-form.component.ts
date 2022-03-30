import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  values: any[] = [];
  id: any;
  product: Product = {
    title: '',
    price: '',
    category: '',
    imageUrl: '',
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getAll()[0];
    categoryService.getAll()[1].subscribe((value) => (this.values = value));

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != 'new' && this.id) {
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
        });
    }
  }

  ngOnInit(): void {}

  save(product: any) {
    if (this.id != 'new' && this.id) {
      this.productService.update(this.id, product).then((resp) => {
        console.log('response update', resp);
      });
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id).then((resp) => {
      console.log('response deleted', resp);
    });
    this.router.navigate(['/admin/products']);
  }
}
