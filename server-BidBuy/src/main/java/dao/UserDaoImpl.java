package dao;

import model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    public Integer getIdByUsername(String username) {
        Session session =this.sessionFactory.getCurrentSession();
        return session.createQuery("select id from User where username=:username",Integer.class)
                .setParameter("username",username)
                .getSingleResult();
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

    @Override
    public User authenticateUser(String usernameOrEmail, String password){
        return this.
                sessionFactory.
                getCurrentSession().
                createQuery("FROM User where (username=:usernameOrEmail or email=:usernameOrEmail) and password=:password",User.class).
                setParameter("usernameOrEmail",usernameOrEmail).
                setParameter("password",password).
                stream().
                findFirst().
                orElse(null);
    }

    @Override
    public boolean existsByUsername(String username) {
        return this.sessionFactory.getCurrentSession().createQuery("from User where username=:username",User.class).setParameter("username",username).getResultList().size()>0;
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.sessionFactory.getCurrentSession().createQuery("from User where email=:email",User.class).setParameter("email",email).getResultList().size()>0;
    }
}
