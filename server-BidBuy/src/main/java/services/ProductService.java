package services;

import model.Product;

import java.util.List;

public interface ProductService {
    public List<Product> getAll(int page, int viewPerPage);
    public Integer getAllCount();
    public Product getById(int id);
    public Product getByName(String name);
    public void save(Product product);
    public void update(Product product);
    public void delete(int id);
}
