package controllers;

import dtos.BidDto;
import dtos.JwtPayloadDto;
import lombok.RequiredArgsConstructor;
import model.Bid;
import model.User;
import org.springframework.web.bind.annotation.*;
import services.BidService;
import services.UserService;
import utils.JwtUtils;
import utils.NumberUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bid")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BidController {
    private final BidService bidService;
    private final UserService userService;


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

    @GetMapping("/getByProductID/{id}")
    public List<Bid> getByProductID(@PathVariable String id) {
        return this.bidService.getByProductId(Integer.parseInt(id));
    }

    @RequestMapping("/getBySellerId")
    public List<Bid> getBySellerId(@RequestParam(name = "sellerId", required = true) int sellerId) {
        return (List<Bid>) this.bidService.getBySellerId(sellerId);
    }

    @RequestMapping("/delete")
    public void delete(@RequestParam(name = "id", required = true) int id) {
        this.bidService.delete(id);
    }

    @PostMapping("/create")
    public void save(@RequestBody Bid bid, @RequestHeader(name = "Authorization") String Authorization) {
        JwtPayloadDto payload = JwtUtils.decode(Authorization);
        User user = userService.getByUsername(payload.getUsername());
        bid.setBidder(user);
        this.bidService.save(bid);
    }

    @RequestMapping("/update")
    public void update(@RequestParam(name = "bid", required = true) Bid bid) {
        this.bidService.update(bid);
    }


}
