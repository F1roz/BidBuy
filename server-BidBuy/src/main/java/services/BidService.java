package services;
import model.Bid;
import java.util.List;
public interface BidService {
    public List<Bid> getAll(int page, int viewPerPage);
    public Integer getAllCount();
    public Bid getById(int id);
    public Bid getByProductId(int productId);
    public Bid getBySellerId(int SellerId);
    public void save(Bid bid);
    public void update(Bid bid);
    public void delete(int id);

}
