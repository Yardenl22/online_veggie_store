import { CommonModule } from '@angular/common';
import {CategoriesService} from '../../services/categories.service';
import {Component, OnInit, Signal} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ShoppingCartComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit{
  categoriesSignal: Signal<string[]>;
  selectedCategory: string = '';

  constructor(private categoriesService: CategoriesService) {
    this.categoriesSignal = this.categoriesService.categories;
  }

  ngOnInit(): void {
    this.categoriesService.fetchCategories();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}
