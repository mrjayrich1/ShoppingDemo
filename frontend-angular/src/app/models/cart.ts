import { CartItem } from '../models/cartItem'

export interface Cart {
  items: CartItem[],
  subtotal: number
}