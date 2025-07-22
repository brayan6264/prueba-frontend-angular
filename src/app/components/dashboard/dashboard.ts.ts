import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.ts.html',
  styleUrl: './dashboard.ts.css'
})
export class Dashboard implements OnInit {
  ngOnInit() {
  this.loadProducts();
}
  currentView: 'none' | 'create' | 'list' = 'none';

  newProduct: Product = {
    name: '',
    url_image: '',
    price: 0
  };

  products: Product[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private productService: ProductService) {}

  toggleCreateForm() {
    this.currentView = 'create';
  }

  loadProducts() {
  this.currentView = 'list';
  console.log('Cargando productos...');
  this.productService.getProducts().subscribe({
    next: res => {
      this.products = res;
    },
    error: err => {
      console.error('Error al cargar productos:', err);
    }
  });
}

  submitProductForm() {
    console.log('Producto a enviar:', this.newProduct);
    this.productService.createProduct(this.newProduct).subscribe({
      next: res => {
        this.successMessage = 'Producto creado exitosamente.';
        this.errorMessage = '';
        this.newProduct = { name: '', url_image: '', price: 0 };
        this.currentView = 'none';

        setTimeout(() => this.successMessage = '', 4000);
      },
      error: err => {
        console.error('Error al crear producto:', err);
        this.errorMessage = 'No se pudo crear el producto. Verifica los datos o tu sesión.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 4000);
      }
    });
  }
}
