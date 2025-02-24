import {CommonModule} from '@angular/common';
import {CategoriesService} from '../../services/categories.service';
import {Component, Signal, signal} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';

import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ShoppingCartComponent, FormsModule, DropdownModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  categoriesSignal: Signal<string[]>;
  selectedCategory = signal<string>('');

  constructor(private categoriesService: CategoriesService) {
    this.categoriesSignal = this.categoriesService.categories;
    this.categoriesService.fetchCategories();
  }

  updateCategory(value: string) {
    this.selectedCategory.set(value);
  }
}
