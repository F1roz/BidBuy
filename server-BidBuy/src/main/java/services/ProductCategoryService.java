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
}
