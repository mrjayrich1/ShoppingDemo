package web.shopping.demo.Mapper;

import org.springframework.stereotype.Component;

import web.shopping.demo.DTOs.CartItemDto;
import web.shopping.demo.Models.CartItem;

@Component
public class CartMapper {

    public CartItemDto cartItemToCartItemDto(CartItem cartItem){
        
        var cartItemDto = new CartItemDto();

        cartItemDto.setProductId(cartItem.getProduct().getId());
        cartItemDto.setPrice(cartItem.getProduct().getPrice());
        cartItemDto.setQuantity(cartItem.getQuantity());
        cartItemDto.setTitle(cartItem.getProduct().getTitle());
        cartItemDto.setLineTotal(cartItem.getQuantity() * cartItem.getProduct().getPrice());

        return cartItemDto;

    }
    
}
