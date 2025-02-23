import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TableModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productsSignal: Signal<Product[]>;
  currentPage: number = 1;
  pageSize: number = 3;
  private _category: string = '';

  @Input() set category(value: string) {
    this._category = value;
    if (this._category) {
      this.currentPage = 1;
      this.fetchProducts();
    }
  }

  get category(): string {
    return this._category;
  }

  constructor(
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.productsSignal = this.productsService.products;
  }

  fetchProducts() {
    this.productsService.fetchProductsByCategory(this.category, this.pageSize, this.currentPage);
  }

  nextPage() {
    this.currentPage++;
    this.fetchProducts();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  addProduct(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  removeProduct(product: Product) {
    this.shoppingCartService.removeProduct(product);
  }
}
