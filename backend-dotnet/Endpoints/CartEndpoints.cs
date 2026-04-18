using backend_dotnet.DTOs;
using backend_dotnet.Services;

namespace backend_dotnet.Endpoints;

public static class CartEndpoints
{
    public static void MapCartEndpoints(this IEndpointRouteBuilder app)
    {
        var cartApi = app.MapGroup("/api/cart");

        cartApi.MapGet("/", GetCartContents);
        cartApi.MapPost("/", AddItemToCart);
    }

    private static IResult GetCartContents(
        HttpContext httpContext,
        ICartService cartService)
    {
        var authHeader = httpContext.Request.Headers.Authorization.ToString();
        if (authHeader != "123Secret456")
            return Results.Unauthorized();

        var cart = cartService.GetCart();
        return Results.Ok(cart);
    }

    private static async Task<IResult> AddItemToCart(
        HttpContext httpContext,
        AddToCartRequest request,
        ICartService cartService,
        IProductService productService)
    {
        var authHeader = httpContext.Request.Headers.Authorization.ToString();
        if (authHeader != "123Secret456")
            return Results.Unauthorized();

        var product = await productService.GetProductByIdAsync(request.ProductId);
        
        if (product == null)
            return Results.NotFound(new { error = "Product not found" });

        var updatedCart = cartService.AddItem(product, request.Quantity);
        
        return Results.Ok(updatedCart);
    }
}
