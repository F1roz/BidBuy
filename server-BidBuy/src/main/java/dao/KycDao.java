package dao;

import model.Kyc;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KycDao {
    private final SessionFactory sessionFactory;

    public KycDao(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    public List<Kyc> getAll(int page,int viewPerPage){
        return this
                .sessionFactory
                .getCurrentSession()
                .createQuery(
                        "FROM Kyc",
                        Kyc.class
                )
                .setMaxResults(viewPerPage)
                .setFirstResult(((page-1)*viewPerPage))
                .getResultList();
    }

    public Integer getAllCount(){
        return this.sessionFactory
                .getCurrentSession()
                .createQuery("from Kyc",Kyc.class).getResultList().size();
    }

}
