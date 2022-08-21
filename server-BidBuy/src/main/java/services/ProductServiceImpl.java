package services;

import dao.ProductDao;
import model.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductDao productDao;

    public ProductServiceImpl(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Override
    public List<Product> getAll(int page, int viewPerPage) {
        return productDao.getAll(page, viewPerPage);
    }

    @Override
    public List<Product> getProductBySellerId(int page, int viewPerPage, int sellerId) {

        return productDao.getProductBySellerId(page, viewPerPage, sellerId);
    }

    @Override
    public Integer getAllCount() {
        return productDao.getAllCount();
    }

    @Override
    public Product getById(int id) {
        return productDao.getById(id);
    }

    @Override
    public Product getByName(String name) {
        return productDao.getByName(name);
    }

    @Override
    public void save(Product product) {
        productDao.save(product);
    }

    @Override
    public void update(Product product) {
        productDao.update(product);
    }

    @Override
    public void delete(int id) {
        productDao.delete(id);
    }

    @Override
    public void changeStatus(int id, String status) {
        productDao.changeStatus(id, status);
    }

    @Override
    public void sellProduct(int id, int buyerId) {
        productDao.sellProduct(id, buyerId);
    }
}

