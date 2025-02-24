import { CommonModule } from '@angular/common';
import { Component, input, Signal, effect } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TableModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productsSignal: Signal<Product[]>;
  category = input<string>('');

  constructor(
    public productsService: ProductsService,
    public shoppingCartService: ShoppingCartService
  ) {
    this.productsSignal = this.productsService.products;

    effect(() => {
      if (this.category()) {
        this.productsService.resetPage();
        this.fetchProducts();
      }
    });
  }

  fetchProducts() {
    this.productsService.fetchProductsByCategory(this.category(), this.productsService.pageSize(), this.productsService.currentPage());
  }

  nextPage() {
    this.productsService.nextPage();
    this.fetchProducts();
  }

  previousPage() {
    this.productsService.previousPage();
    this.fetchProducts();
  }
}
