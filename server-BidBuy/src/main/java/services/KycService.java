package services;

import dao.KycDao;
import model.Kyc;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class KycService {
    private final KycDao kycDao;

    public KycService(KycDao kycDao){
        this.kycDao = kycDao;
    }

    @Transactional
    public List<Kyc> getAll(int page,int viewPerPage){return this.kycDao.getAll(page,viewPerPage);}
    public Integer getAllCount(){return this.kycDao.getAllCount();}
    public Kyc getByNumber(String number){return this.kycDao.getByNumber(number);}
}
