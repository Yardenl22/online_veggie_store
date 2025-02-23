import {Button} from "primeng/button";
import {CommonModule} from '@angular/common';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
    imports: [CommonModule, Button],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  onAdd() {
    this.add.emit(this.product);
  }

  onRemove() {
    this.remove.emit(this.product);
  }

}
