using backend_dotnet.Models;

namespace backend_dotnet.Services;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
}

public class ProductService : IProductService
{
    private readonly HttpClient _httpClient;
    private List<Product>? _cachedProducts;

    public ProductService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        //If cache contains values return it (the purpose of caching!)
        if (_cachedProducts != null) return _cachedProducts;

        //Fetch products from DummyJSON url provided
        var response = await _httpClient.GetFromJsonAsync<DummyJsonResponse>("https://dummyjson.com/products");
        
        //response == null ? cachedProducts = new list<products>; (empty list in event response is null)
        _cachedProducts = response?.Products.Select(p => new Product
        {
            Id = p.Id,
            Title = p.Title,
            Price = p.Price,
            Thumbnail = p.Thumbnail,
            Description = p.Description
        }).ToList() ?? new List<Product>();

        return _cachedProducts;
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        var products = await GetProductsAsync();
        return products.FirstOrDefault(p => p.Id == id);
    }

    private class DummyJsonResponse { public List<Product> Products { get; set; } = new List<Product>(); }
}
