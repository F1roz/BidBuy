package services;

import dao.ProductDao;
import dtos.ProductDto;
import model.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductDao productDao;

    public ProductServiceImpl(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Override
    public List<ProductDto> getAll(int page, int viewPerPage) {
        return productDao.getAll(page, viewPerPage).stream().map(ProductDto::fromDbWithRelations).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductBySellerId(int page, int viewPerPage, int sellerId) {

        return productDao.getProductBySellerId(page, viewPerPage, sellerId).stream().map(ProductDto::fromDbWithRelations).collect(Collectors.toList());
    }

    @Override
    public Integer getAllCount() {
        return productDao.getAllCount();
    }

    @Override
    public ProductDto getById(int id) {
        return ProductDto.fromDbWithRelations(productDao.getById(id));
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
        productDao.changeStatus(id,status);
    }

    @Override
    public List<ProductDto> getAllListedProduct(int page, int viewPerPage) {
        return productDao.getAllListedProduct(page, viewPerPage).stream().map(ProductDto::fromDbWithRelations).collect(Collectors.toList());
    }
}

