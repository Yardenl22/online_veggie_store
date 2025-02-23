import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Divider} from "primeng/divider";
import {ShoppingCartService} from './services/shopping-cart.service';
import {Toolbar} from "primeng/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toolbar, Divider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public shoppingCartService: ShoppingCartService) {}

  get totalItems(): number {
    return this.shoppingCartService.getTotalItems();
  }
}
