package web.shopping.demo.Service;

import web.shopping.demo.DTOs.CartResponseDto;
import web.shopping.demo.Models.Product;

public interface CartServiceImpl {

    CartResponseDto getCart();
    CartResponseDto addItem(Product product, int quantity);
    
}
