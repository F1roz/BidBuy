package dao;

import model.Product;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class ProductDaoImpl implements ProductDao {
    private final SessionFactory sessionFactory;

    public ProductDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<Product> getAll(int page, int viewPerPage) {
        return this
                .sessionFactory
                .getCurrentSession()
                .createQuery(
                        "FROM Product",
                        Product.class
                )
                .setMaxResults(viewPerPage)
                .setFirstResult(((page-1)*viewPerPage))
                .getResultList();
    }
    @Override
    public Integer getAllCount() {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Product",Product.class).getResultList().size();
    }
    @Override
    public Product getById(int id) {
        return this.sessionFactory
                .getCurrentSession()
                .get(Product.class,id);
    }
    @Override
    public Product getByName(String name) {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Product where name=:name",Product.class)
                .setParameter("name",name)
                .getSingleResult();
    }
    @Override
    public void save(Product product) {
        this.sessionFactory.getCurrentSession().save(product);
    }
    @Override
    public void update(Product product) {
        this.sessionFactory.getCurrentSession().update(product);
    }
    @Override
    public void delete(int id) {
        this.sessionFactory.getCurrentSession().delete(getById(id));
    }

}