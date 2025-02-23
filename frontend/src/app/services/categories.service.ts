import {ApiAdapterService} from './api-adapter.service';
import {Injectable, signal} from '@angular/core';
import {ProductCategoriesResponse} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories = signal<string[]>([]);

  constructor(private api: ApiAdapterService) {
  }

  fetchCategories(): void {
    this.api.get<ProductCategoriesResponse>('/product_categories')
      .subscribe({
        next: (response) => {
          this.categories.set(response.categories);
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
        }
      });
  }
}
