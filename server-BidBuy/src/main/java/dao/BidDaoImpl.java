package dao;

import model.Bid;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BidDaoImpl implements BidDao {

    private final SessionFactory sessionFactory;

    public BidDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<Bid> getAll(int page, int viewPerPage) {
        return this
                .sessionFactory
                .getCurrentSession()
                .createQuery(
                        "FROM Bid",
                        Bid.class
                )
                .setMaxResults(viewPerPage)
                .setFirstResult(((page - 1) * viewPerPage))
                .getResultList();
    }

    @Override
    public Integer getAllCount() {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Bid", Bid.class).getResultList().size();
    }

    @Override
    public Bid getById(int id) {
        return this.sessionFactory
                .getCurrentSession()
                .get(Bid.class, id);
    }

    @Override
    public List<Bid> getByProductId(int productId) {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Bid where productId=:productId order by bidPrice desc", Bid.class)
                .setParameter("productId", productId)
                .getResultList();
    }

    @Override
    public Bid getBySellerId(int SellerId) {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Bid where sellerId=:sellerId", Bid.class)
                .setParameter("sellerId", SellerId)
                .getSingleResult();
    }

    @Override
    public void save(Bid bid) {
        this.sessionFactory.getCurrentSession().save(bid);
    }

    @Override
    public void update(Bid bid) {
        this.sessionFactory.getCurrentSession().update(bid);
    }

    @Override
    public void delete(int id) {
        this.sessionFactory.getCurrentSession().delete(getById(id));
    }
}
