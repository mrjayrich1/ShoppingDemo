using backend_dotnet.Services;

namespace backend_dotnet.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products", GetAllProducts);
    }

    private static async Task<IResult> GetAllProducts(IProductService productService)
    {
        var products = await productService.GetProductsAsync();
        return Results.Ok(products);
    }
}