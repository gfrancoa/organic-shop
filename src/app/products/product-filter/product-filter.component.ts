import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  categories$;
  productIds: any[] = [];
  @Input('category') category = '';

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll()[0];
    categoryService.getAll()[1].subscribe((ids) => (this.productIds = ids));
  }

  ngOnInit(): void {}
}
