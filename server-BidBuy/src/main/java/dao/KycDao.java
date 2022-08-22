package dao;

import model.Kyc;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KycDao {
    private final SessionFactory sessionFactory;

    public KycDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public List<Kyc> getAll(int page, int viewPerPage) {
        return this
                .sessionFactory
                .getCurrentSession()
                .createQuery(
                        "FROM Kyc",
                        Kyc.class
                )
                .setMaxResults(viewPerPage)
                .setFirstResult(((page - 1) * viewPerPage))
                .getResultList();
    }

    public Integer getAllCount() {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Kyc", Kyc.class).getResultList().size();
    }

    //getByNumber returns false if there is no kyc with the given number
    public Kyc asd(String number) {
        return this.sessionFactory
                .getCurrentSession()
                .createQuery(
                        "FROM Kyc WHERE number = :number",
                        Kyc.class
                )
                .setParameter("number", number)
                .getSingleResult();

    }

    public Kyc getByNumber(String number) {
        try {
            return this.
                    sessionFactory.
                    getCurrentSession().
                    createQuery("from Kyc where number=:number", Kyc.class).
                    setParameter("number", number).
                    getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }


}
