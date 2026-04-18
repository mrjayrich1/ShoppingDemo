package web.shopping.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import web.shopping.demo.DTOs.CartItemDto;
import web.shopping.demo.DTOs.CartResponseDto;
import web.shopping.demo.Mapper.CartMapper;
import web.shopping.demo.Models.CartItem;
import web.shopping.demo.Models.Product;

@Service
public class CartService implements CartServiceImpl
{
    private List<CartItem> items = new ArrayList<>();
    private CartMapper cartMapper;

    public CartService(CartMapper cartMapper){
        this.cartMapper = cartMapper;
    }

    public CartResponseDto getCart() {

        var cartItemList = new ArrayList<CartItemDto>();

        for (CartItem cartItem : items)
            cartItemList.add(cartMapper.cartItemToCartItemDto(cartItem));


        var cartResponseDto = new CartResponseDto();
        cartResponseDto.setItems(cartItemList);

        //Rounding value to 2 decimal places
        double rawValue = cartItemList
                            .stream()
                            .mapToDouble(CartItemDto::getLineTotal)
                            .sum();
        double rounded = Math.round(rawValue * 100.0) / 100.0;

        cartResponseDto.setSubtotal(rounded);

        return cartResponseDto;
    }

    public CartResponseDto addItem(Product product, int quantity) {

        var existingItem = items.stream()
                                .filter(i -> product.getId() == i.getProduct().getId())
                                .findFirst()
                                .orElse(null);

        if (existingItem != null)
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        else
            items.add(new CartItem(product, quantity));

        return getCart();
    }
}
