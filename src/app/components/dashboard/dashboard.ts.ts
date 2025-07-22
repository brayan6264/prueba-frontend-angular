import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.ts.html',
  styleUrl: './dashboard.ts.css'
})
export class Dashboard implements OnInit {
  currentView: 'none' | 'create' | 'list' | 'purchases' | 'buy' = 'none';
  purchases: any[] = [];
  products: Product[] = [];

  newProduct: Product = {
    product_id: 0,
    name: '',
    url_image: '',
    price: 0
  };

  selectedProductId: number | null = null;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentView = 'none';
  }

  toggleCreateForm() {
    this.resetForms();
    this.currentView = 'create';
  }

  toggleBuyForm() {
    this.resetForms();
    this.currentView = 'buy';
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: res => {
        this.products = res;
        this.currentView = 'list';
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error al cargar productos:', err);
        this.toastr.error('Error al cargar productos', 'Error');
      }
    });
  }

  showPurchases() {
    this.productService.getMyPurchases().subscribe({
      next: res => {
        this.purchases = res;
        this.currentView = 'purchases';
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error al cargar compras:', err);
        this.toastr.error('No se pudieron cargar las compras.', 'Error');
      }
    });
  }

  submitProductForm() {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.toastr.success('Producto creado exitosamente', 'Éxito');
        this.resetForms();
        this.loadProducts(); // Recargar productos y mostrar vista
      },
      error: err => {
        console.error('Error al crear producto:', err);
        this.toastr.error('Error al crear producto', 'Error');
      }
    });
  }

  submitBuyForm() {
    const parsedProductId = Number(this.selectedProductId);

    if (!parsedProductId || this.quantity < 1) {
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.toastr.error('Debes iniciar sesión para comprar productos.', 'Error');
      return;
    }

    this.productService.buyProduct(
      Number(userId),
      parsedProductId,
      this.quantity
    ).subscribe({
      next: () => {
        this.toastr.success('Compra realizada con éxito', 'Éxito');
        this.resetForms();
        this.showPurchases(); // Recargar compras y mostrar vista
      },
      error: err => {
        console.error('Error en la compra:', err);
        this.toastr.error('No se pudo realizar la compra.', 'Error');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.toastr.success('Sesión cerrada exitosamente', 'Éxito');
    this.currentView = 'none';
  }

  onProductChange(event: any) {
    const product = this.products.find(p => p.name === event);
    this.selectedProductId = product ? product.product_id : null;
  }

  private resetForms() {
    this.newProduct = { product_id: 0, name: '', url_image: '', price: 0 };
    this.selectedProductId = null;
    this.quantity = 1;
  }
}
