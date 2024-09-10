import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'productitems',
  templateUrl: './productitems.component.html',
  styleUrls: ['./productitems.component.scss']
})
export class ProductitemsComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  onAddToCart(){
    this.add.emit(this.product);
  }

}
