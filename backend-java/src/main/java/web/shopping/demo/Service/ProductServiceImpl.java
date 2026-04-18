package web.shopping.demo.Service;

import web.shopping.demo.Models.Product;

public interface ProductServiceImpl {

    Iterable<Product> getProducts();
    Product getProductById(int id);
    
}
