package services;

import dtos.ProductDto;
import model.Product;

import java.util.List;

public interface ProductService {
    public List<ProductDto> getAll(int page, int viewPerPage);
    public List<ProductDto> getProductBySellerId(int page, int viewPerPage, int sellerId);
    public Integer getAllCount();
    public ProductDto getById(int id);
    public Product getByName(String name);
    public void save(Product product);
    public void update(Product product);
    public void delete(int id);
    public void changeStatus(int id, String status);

}
