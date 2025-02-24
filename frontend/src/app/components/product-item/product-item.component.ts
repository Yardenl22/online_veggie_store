import {Button} from "primeng/button";
import {CommonModule} from '@angular/common';
import {Component, input, output, EventEmitter} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  product = input.required<Product>();
  add = output<Product>();
  remove = output<Product>();

  onAdd() {
    this.add.emit(this.product());
  }

  onRemove() {
    this.remove.emit(this.product());
  }
}
