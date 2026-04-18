package web.shopping.demo.Controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import web.shopping.demo.DTOs.AddToCartRequest;
import web.shopping.demo.DTOs.CartResponseDto;
import web.shopping.demo.Models.Product;
import web.shopping.demo.Service.CartService;
import web.shopping.demo.Service.ProductService;

@RestController
@RequestMapping("/api/cart")
public class CartController
{
    private final CartService cartService;
    private final ProductService productService;

    public CartController(CartService cartService, ProductService productService) {
        this.cartService = cartService;
        this.productService = productService;
    }

    @GetMapping()
    public ResponseEntity<?> getCartContents(@RequestHeader(value = "Authorization", required = true) String authorization) {
        
        if (!"123Secret456".equals(authorization)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized"));
        }

        var cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }

    @PostMapping()
    public ResponseEntity<?> addItemToCart(@RequestHeader(value = "Authorization", required = true) String authorization,
                                           @RequestBody AddToCartRequest request) {

        if (!"123Secret456".equals(authorization)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized"));
        }

        Product product = productService.getProductById(request.getProductId());

        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Product not found"));
        }

        CartResponseDto updatedCart = cartService.addItem(product, request.getQuantity());

        return ResponseEntity.ok(updatedCart);
    }
}
