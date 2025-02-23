import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ShoppingCartService} from './services/shopping-cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public shoppingCartService: ShoppingCartService) {}

  get totalItems(): number {
    return this.shoppingCartService.getTotalItems();
  }
}
