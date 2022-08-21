package services;

import dao.ProductCategoryDao;
import lombok.RequiredArgsConstructor;
import model.ProductCategory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ProductCategoryService {
    private final ProductCategoryDao productCategoryDao;

    public List<ProductCategory> getAll() {
        return productCategoryDao.getAll();
    }

    public void addOne(ProductCategory productCategory) {
        productCategoryDao.addOne(productCategory);
    }

    public void update(ProductCategory productCategory) {
        productCategoryDao.update(productCategory);
    }

    public void deleteOne(int id) {
        productCategoryDao.deleteOne(id);
    }
}
