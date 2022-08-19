package controllers;

import dtos.BidDto;
import model.Bid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import services.BidService;
import utils.NumberUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bid")
@CrossOrigin(origins = "*")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @RequestMapping("/")
    public List<BidDto> getAll(
            @RequestParam(name = "page", required = false) String page,
            @RequestParam(name = "view", required = false) String viewPerPage
    ) {
        int pageNo = NumberUtils.stringToNumOrNeg(page);
        int view = NumberUtils.stringToNumOrNeg(viewPerPage);
        List<Bid> allBid = this
                .bidService
                .getAll(
                        Math.max(pageNo, 1),
                        Math.max(view, 10)
                );
        return allBid.stream().map(BidDto::fromDbWithRelations).collect(Collectors.toList());
    }

    @RequestMapping("/count")
    public Integer getAllCount() {
        return this.bidService.getAllCount();
    }

    @RequestMapping("/getById")
    public Bid getById(@RequestParam(name = "id", required = true) int id) {
        return this.bidService.getById(id);
    }

    @RequestMapping("/getByProductID")
    public List<Bid> getByProductID(@RequestParam(name = "productID", required = true) int productID) {
        return (List<Bid>) this.bidService.getByProductId(productID);
    }

    @RequestMapping("/getBySellerId")
    public List<Bid> getBySellerId(@RequestParam(name = "sellerId", required = true) int sellerId) {
        return (List<Bid>) this.bidService.getBySellerId(sellerId);
    }

    @RequestMapping("/delete")
    public void delete(@RequestParam(name = "id", required = true) int id) {
        this.bidService.delete(id);
    }

    @RequestMapping("/create")
    public void save(@RequestParam(name = "bid", required = true) Bid bid) {
        this.bidService.save(bid);
    }

    @RequestMapping("/update")
    public void update(@RequestParam(name = "bid", required = true) Bid bid) {
        this.bidService.update(bid);
    }


}
