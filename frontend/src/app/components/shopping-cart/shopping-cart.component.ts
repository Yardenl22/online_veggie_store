import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ShoppingCartItem } from '../../models/shopping-cart.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';

import { TableModule } from 'primeng/table';
import {Panel} from 'primeng/panel';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, Panel],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartItemsSignal: Signal<ShoppingCartItem[]>;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.cartItemsSignal = this.shoppingCartService.cartItems;
  }

  get totalItems(): number {
    return this.shoppingCartService.getTotalItems()
  }

  get totalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  increase(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  decrease(product: Product) {
    this.shoppingCartService.removeProduct(product);
  }

  removeProduct(product: Product) {
    this.shoppingCartService.clearProduct(product);
  }

  saveCart() {
    this.shoppingCartService.saveCart();
  }

}
