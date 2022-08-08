package dao;

import model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class UserDaoImpl implements UserDao {
    private final SessionFactory sessionFactory;

    public UserDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<User> getAll(int page, int viewPerPage) {
        Session session =this.sessionFactory.getCurrentSession();
        return session.createQuery("from User",User.class)
                .setMaxResults(viewPerPage)
                .setFirstResult(((page-1)*viewPerPage))
                .getResultList();
    }
    @Override
    public Integer getAllCount() {
        Session session =this.sessionFactory.getCurrentSession();
        return session.createQuery("from User",User.class).getResultList().size();
    }
    @Override
    public User getById(int id) {
        Session session =this.sessionFactory.getCurrentSession();
        return session.get(User.class,id);
    }
    @Override
    public User getByEmail(String email) {
        Session session =this.sessionFactory.getCurrentSession();
        return session.createQuery("from User where email=:email",User.class)
                .setParameter("email",email)
                .getSingleResult();
    }
    @Override
    public User getByUsername(String username) {
        Session session =this.sessionFactory.getCurrentSession();
        return session.createQuery("from User where username=:username",User.class)
                .setParameter("username",username)
                .getSingleResult();
    }
    @Override
    public void save(User user) {
        Session session =this.sessionFactory.getCurrentSession();
        session.save(user);
    }
    @Override
    public void update(User user) {
        Session session =this.sessionFactory.getCurrentSession();
        session.update(user);
    }
    @Override
    public void delete(int id) {
        Session session =this.sessionFactory.getCurrentSession();
        session.delete(session.get(User.class,id));
    }

}
