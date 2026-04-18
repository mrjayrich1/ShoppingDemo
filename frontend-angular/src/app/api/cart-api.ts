import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'

@Injectable({ providedIn: 'root' })
export class CartApi {

  baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetCartContents<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint));
  }

  AddItemToCart<T>(endpoint: string, request: { productId: number; quantity: number }): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), request);
  }

  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }

}
