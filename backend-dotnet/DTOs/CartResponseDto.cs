namespace backend_dotnet.DTOs;

public class CartResponseDto
{
    public List<CartItemDto> Items { get; set; } = new();
    public decimal Subtotal { get; set; }
}