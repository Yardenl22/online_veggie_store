import { ApiAdapterService } from './api-adapter.service';
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartItem } from '../models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  cartItems = signal<ShoppingCartItem[]>([])

  constructor(private api: ApiAdapterService) {}

  addProduct(product: Product): void {
    const currentItems = this.cartItems()
    const existingItem = currentItems.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, {product, quantity: 1}])
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

  getTotalItems(): number {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  saveCart(): void {
    const currentItems = this.cartItems();

    const payload = {
      items: currentItems,
      total_items: this.getTotalItems(),
      total_price: this.getTotalPrice()
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
