package web.shopping.demo.DTOs;

import java.util.List;

public class CartResponseDto
{
    public List<CartItemDto> items;
    public double subtotal;
    
    public List<CartItemDto> getItems() {
        return items;
    }
    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }
    public double getSubtotal() {
        return subtotal;
    }
    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}