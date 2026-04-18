import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartApi } from '../../api/cart-api';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartpage.html',
  styleUrl: './cartpage.css',
})
export class Cartpage implements OnInit {
  private cartApi = inject(CartApi);
  private router = inject(Router);

  cart = signal<Cart | null>(null);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    console.log('Starting product load...');

    this.cartApi.GetCartContents('cart').subscribe({
      next: (response: any) => {
        let cartData = response as Cart;
        this.cart.set(cartData);
      },
      error: (err: any) => {
        console.error('Failed to load cart', err);
        this.cart.set(null);
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  getSubtotal(): number {
    const currentCart = this.cart();
    if (!currentCart?.items) return 0;

    return currentCart.items.reduce((sum, item) => sum + (item.lineTotal || item.price * item.quantity), 0);
  }
}
