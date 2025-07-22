import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.ts.html',
  styleUrl: './dashboard.ts.css'
})
export class Dashboard implements OnInit {
  currentView: 'none' | 'create' | 'list' | "purchases"|'buy' = 'none';
  purchases: any[] = [];
  newProduct: Product = {
    product_id: 0,
    name: '',
    url_image: '',
    price: 0
  };

  products: Product[] = [];
  selectedProductId: number | null = null;
  quantity: number = 1;

  successMessage = '';
  errorMessage = '';

  constructor(private productService: ProductService,  private router: Router) {}

  ngOnInit() {
    this.loadProducts();
    this.showPurchases();
    this.currentView = 'none';
  }

  toggleCreateForm() {
    this.currentView = 'create';
  }

  loadProducts() {
    this.currentView = 'list';
    console.log('Cargando productos...');
    this.productService.getProducts().subscribe({
      next: res => {
        console.log('Productos cargados:', res);
        this.products = res;
      },
      error: err => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  toggleBuyForm() {
    this.currentView = 'buy';
  }
onProductChange(event: any) {
  const id = Number(event);
  const product = this.products.find(p => p.name === event);
  this.selectedProductId = product ? product.product_id : null;
  console.log('Producto seleccionado:', this.selectedProductId);
}
  submitProductForm() {
    console.log('Producto a enviar:', this.newProduct);
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.successMessage = 'Producto creado exitosamente.';
        this.errorMessage = '';
        this.newProduct = { product_id: 0, name: '', url_image: '', price: 0 };
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

  submitBuyForm() {
    const parsedProductId = Number(this.selectedProductId);
    console.log('Datos de compra:', parsedProductId, this.quantity);

    if (!parsedProductId || this.quantity < 1) {
      this.errorMessage = 'Selecciona un producto válido o una cantidad mayor a 0.';
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'Usuario no autenticado.';
      return;
    }

    this.productService.buyProduct(
      Number(userId),
      parsedProductId,
      this.quantity
    ).subscribe({
      next: () => {
        this.successMessage = 'Compra realizada con éxito.';
        this.errorMessage = '';
        this.selectedProductId = null;
        this.quantity = 1;
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: err => {
        console.error('Error en la compra:', err);
        this.errorMessage = 'No se pudo realizar la compra.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 4000);
      }
    });
  }
  showPurchases() {
  this.currentView = 'purchases';
  this.productService.getMyPurchases().subscribe({
    next: res => {
      this.purchases = res;
      console.log('Compras:', res);
    },
    error: err => {
      console.error('Error al cargar compras:', err);
      this.errorMessage = 'No se pudieron cargar las compras.';
    }
  });
}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  this.currentView = 'none';
}}
