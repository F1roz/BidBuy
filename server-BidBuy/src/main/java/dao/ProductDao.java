package dao;

import model.Product;

import java.util.List;

public interface ProductDao {
    public List<Product> getAll(int page, int viewPerPage);
    public List<Product> getProductBySellerId(int page, int viewPerPage, int sellerId);
    public Integer getAllCount();
    public Product getById(int id);
    public Product getByName(String name);
    public void save(Product product);
    public void update(Product product);
    public void delete(int id);

    public void changeStatus(int id, String status);

    public void sellProduct(int id, int buyerId, float sellPrice, String status);
}
