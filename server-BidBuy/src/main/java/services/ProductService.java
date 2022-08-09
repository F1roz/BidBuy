package services;

import dtos.ProductDto;
import model.Product;

import java.util.List;

public interface ProductService {
    public List<ProductDto> getAll(int page, int viewPerPage);
    public Integer getAllCount();
    public ProductDto getById(int id);
    public Product getByName(String name);
    public void save(Product product);
    public void update(Product product);
    public void delete(int id);
}
