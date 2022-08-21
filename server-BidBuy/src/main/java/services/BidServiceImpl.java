package services;

import dao.BidDao;
import model.Bid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BidServiceImpl implements BidService {
    private final BidDao bidDao;

    public BidServiceImpl(BidDao bidDao) {
        this.bidDao = bidDao;
    }

    @Override
    public List<Bid> getAll(int page, int viewPerPage) {
        return bidDao.getAll(page, viewPerPage);
    }

    @Override
    public Integer getAllCount() {
        return bidDao.getAllCount();
    }

    @Override
    public Bid getById(int id) {
        return bidDao.getById(id);
    }

    @Override
    public List<Bid> getByProductId(int productId) {
        return bidDao.getByProductId(productId);
    }

    @Override
    public Bid getBySellerId(int SellerId) {
        return bidDao.getBySellerId(SellerId);
    }

    @Override
    public void save(Bid bid) {
        bidDao.save(bid);
    }

    @Override
    public void update(Bid bid) {
        bidDao.update(bid);
    }

    @Override
    public void delete(int id) {
        bidDao.delete(id);
    }
}
