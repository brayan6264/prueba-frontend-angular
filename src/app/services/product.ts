import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  name: string;
  url_image: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://prueba-backend-fastapi.onrender.com/api/products';
  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  createProduct(product: Product): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, product, { headers });
  }
  getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl);
}
}