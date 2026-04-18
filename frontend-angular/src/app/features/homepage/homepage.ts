import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductApi } from '../../api/product-api';
import { CartApi } from '../../api/cart-api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {

  private productApi = inject(ProductApi);
  private cartApi = inject(CartApi);
  private router = inject(Router);
  products = signal<Product[]>([]);
  private quantities = signal<Map<number, number>>(new Map());
  searchTerm = signal<string>('');

  constructor() { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    console.log('Starting product load...');

    this.productApi.getProducts('products').subscribe({
      next: (response: any) => {        
        this.products.set([...response]);
      },
      error: (err: any) => {
        console.error('Failed to load products', err);
        this.products.set([]);
      }
    });
  }

  addToCart(productId:number) {
    console.log('Starting product load...');
    let productQuantity = this.getQuantity(productId);

    this.cartApi.AddItemToCart('cart', {productId, quantity:productQuantity}).subscribe();
  }

  getQuantity(productId: number): number {
    return this.quantities().get(productId) ?? 1;
  }

  increaseQuantity(productId: number) {
    const current = this.getQuantity(productId);
    this.quantities.update(map => {
      const newMap = new Map(map);
      newMap.set(productId, current + 1);
      return newMap;
    });
  }

  decreaseQuantity(productId: number) {
    const current = this.getQuantity(productId);
    if (current <= 1) return;

    this.quantities.update(map => {
      const newMap = new Map(map);
      newMap.set(productId, current - 1);
      return newMap;
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.products();
    return this.products().filter(p => 
      p.title.toLowerCase().includes(term)
    );
  });

}
