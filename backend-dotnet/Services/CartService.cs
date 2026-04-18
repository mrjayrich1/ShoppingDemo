using backend_dotnet.DTOs;
using backend_dotnet.Models;

namespace backend_dotnet.Services;

/*
Leaving interface here for demo purposes but should be in
it's own folder for a cleaner layout and for DI purposes.
*/
public interface ICartService
{
    CartResponseDto GetCart();
    CartResponseDto AddItem(Product product, int quantity);
}

public class CartService : ICartService
{
    private readonly List<CartItem> _items = new();

    public CartResponseDto GetCart()
    {
        var itemDtos = _items.Select(item => new CartItemDto
        {
            ProductId = item.Product.Id,
            Title = item.Product.Title,
            Price = item.Product.Price,
            Quantity = item.Quantity,
            LineTotal = item.Product.Price * item.Quantity
        }).ToList();

        return new CartResponseDto
        {
            Items = itemDtos,
            Subtotal = Math.Round(itemDtos.Sum(i => i.LineTotal), 2)
        };
    }

    public CartResponseDto AddItem(Product product, int quantity)
    {
        var existingItem = _items.FirstOrDefault(i => i.Product.Id == product.Id);

        if (existingItem != null)
            existingItem.Quantity += quantity;
        else
            _items.Add(new CartItem { Product = product, Quantity = quantity });

        return GetCart();
    }
}
