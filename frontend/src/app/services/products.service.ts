import { ApiAdapterService } from './api-adapter.service';
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products = signal<Product[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(3);

  constructor(private api: ApiAdapterService) {}

  fetchProductsByCategory(category: string, pageSize = this.pageSize(), page = this.currentPage()): void {
    const products_by_category_url = `/products_by_category?category=${category}&pageSize=${pageSize}&page=${page}`;
    this.api.get<{ products: Product[] }>(products_by_category_url)
      .pipe(
        map(response => response.products)
      )
      .subscribe({
        next: (products: Product[]) => {
          this.products.set(products);
        },
        error: err => console.error('Error fetching products:', err)
      });
  }

  nextPage(): void {
    this.currentPage.set(this.currentPage() + 1);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  resetPage(): void {
    this.currentPage.set(1);
  }

}
