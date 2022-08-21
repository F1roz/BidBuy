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

    public void addOne(ProductCategory productCategory) {
        this.sessionFactory.getCurrentSession().save(productCategory);
    }

    public void update(ProductCategory productCategory) {
        this.sessionFactory.getCurrentSession().update(productCategory);
    }

    public void deleteOne(int id) {
        ProductCategory productCategory = this.
                sessionFactory.
                getCurrentSession().
                createQuery("FROM ProductCategory  where id=:id", ProductCategory.class).
                setParameter("id", id).
                getSingleResult();
        this.sessionFactory.getCurrentSession().delete(productCategory);
    }
}
