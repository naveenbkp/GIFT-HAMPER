import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HampeviaService } from './services/hampevia.service';
import { CommonModule } from '@angular/common';
import { Product } from './models/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'HampéviaApp';

  products: Product[] = [];
  newProduct: Product | null = null;
  isSaving = false;
  saveError = '';
  deletingProductIds = new Set<number>();
  deleteError = '';

  deleteProduct(product: Product): void {
    if (this.deletingProductIds.has(product.id)) return;

    this.deletingProductIds.add(product.id);
    this.deleteError = '';
    this.hampeviaService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(item => item.id !== product.id);
        this.deletingProductIds.delete(product.id);
      },
      error: () => {
        this.deleteError = `Could not delete "${product.name}". Please try again.`;
        this.deletingProductIds.delete(product.id);
      }
    });
  }

  addProduct(): void {
    this.newProduct = { id: 0, name: '', description: '', price: 0, quantity: 0 };
    this.saveError = '';
  }

  cancelAdd(): void {
    this.newProduct = null;
    this.saveError = '';
  }

  saveProduct(): void {
    if (!this.newProduct || this.isSaving) return;

    const product = { ...this.newProduct, name: this.newProduct.name.trim() };
    if (!product.name || !Number.isFinite(product.price) || product.price < 0 ||
        !Number.isInteger(product.quantity) || product.quantity < 0) {
      this.saveError = 'Enter a name, a non-negative price, and a whole, non-negative quantity.';
      return;
    }

    this.isSaving = true;
    this.saveError = '';
    this.hampeviaService.createProduct(product).subscribe({
      next: (createdProduct) => {
        this.products = [...this.products, createdProduct];
        this.newProduct = null;
        this.isSaving = false;
      },
      error: () => {
        this.saveError = 'Could not save the product. Please try again.';
        this.isSaving = false;
      }
    });
  }

  constructor(private hampeviaService: HampeviaService) {}
  ngOnInit(): void {
    this.hampeviaService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log("Products",this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
