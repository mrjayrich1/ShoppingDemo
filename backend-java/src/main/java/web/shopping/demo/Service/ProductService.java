package web.shopping.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import web.shopping.demo.DTOs.DummyJsonResponse;
import web.shopping.demo.Models.Product;

@Service
public class ProductService implements ProductServiceImpl
{
    private final RestTemplate restTemplate;
    private List<Product> cachedProducts;

    public ProductService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Product> getProducts()
    {
        //If cache contains values return it (the purpose of caching!)
        if (cachedProducts != null) return cachedProducts;

        String url = "https://dummyjson.com/products";

        //Fetch products from DummyJSON url provided
        DummyJsonResponse response = restTemplate.getForObject(url, DummyJsonResponse.class);
        
        //response == null ? cachedProducts = new list<products>; (empty list in event response is null)
        if (response != null && response.getProducts() != null) {
            this.cachedProducts = response.getProducts().stream()
                    .map(p -> new Product(
                        p.getId(),
                        p.getTitle(),
                        p.getPrice(),
                        p.getThumbnail(),
                        p.getDescription()
                    ))
                    .toList();
        } else {
            this.cachedProducts = new ArrayList<>();
        }

        return cachedProducts;
    }

    public Product getProductById(int id) {
        List<Product> products = getProducts();   // This will use cache if available
        
        return products.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }


}
