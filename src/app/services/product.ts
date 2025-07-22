import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NG_APP_API_URL } from '../../environments/environment.generated';

export interface Product {
  product_id:number;
  name: string;
  url_image: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${NG_APP_API_URL}products`;
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
buyProduct(user_id: number, product_id: number, total_products: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl.replace('/products', '/purchases'), {
      user_id,
      product_id,
      total_products
    }, { headers });
  }
getMyPurchases(): Observable<any[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(this.apiUrl.replace('/products', '/purchases/me'), { headers });
}}