package dao;

import lombok.RequiredArgsConstructor;
import model.ProductCategory;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProductCategoryDao {
    private final SessionFactory sessionFactory;

    public List<ProductCategory> getAll() {
        return this.
                sessionFactory.
                getCurrentSession().
                createQuery("FROM ProductCategory ", ProductCategory.class).
                getResultList();
    }
}
