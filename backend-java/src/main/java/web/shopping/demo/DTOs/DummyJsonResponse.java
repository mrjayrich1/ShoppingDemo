package web.shopping.demo.DTOs;

import java.util.List;

public class DummyJsonResponse {
    
    private List<DummyProduct> products;

    public List<DummyProduct> getProducts() {
        return products;
    }

    public void setProducts(List<DummyProduct> products) {
        this.products = products;
    }
}