import { ApiAdapterService } from './api-adapter.service';
import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartItem } from '../models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  cartItems = signal<ShoppingCartItem[]>([]);
  totalItems = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });
  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  });

  constructor(private api: ApiAdapterService) {}

  addProduct(product: Product): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { product, quantity: 1 }]);
    }
  }

  removeProduct(product: Product): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product._id === product._id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        this.cartItems.set([...currentItems]);
      } else {
        this.clearProduct(product);
      }
    }
  }

  clearProduct(product: Product): void {
    const currentItems = this.cartItems();
    this.cartItems.set(currentItems.filter(item => item.product._id !== product._id));
  }

  saveCart(): void {
    const currentItems = this.cartItems();

    const payload = {
      items: currentItems,
      total_items: this.totalItems(),
      total_price: this.totalPrice()
    };

    this.api.post('/save_shopping_cart', payload)
      .subscribe({
        next: response => {
          alert('Cart saved successfully!');
        },
        error: err => {
          alert('Error saving cart: ' + err.message);
        }
      });
  }
}
