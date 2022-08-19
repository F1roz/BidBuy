package dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import model.Bid;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BidDto {
    private int id;
    private float bidPrice;
    private ProductDto product;
    private UserDto bidder;
    private String createdAt;

    public static BidDto fromDb(Bid bid) {
        return new BidDto(bid.getId(), bid.getBidPrice(), null, null, bid.getCreated_at());
    }

    public static BidDto fromDbWithRelations(Bid bid) {
        BidDto bidDto = new BidDto(bid.getId(), bid.getBidPrice(), null, null, bid.getCreated_at());
        bidDto.setProduct(ProductDto.fromDb(bid.getProduct()));
        bidDto.setBidder(UserDto.fromDb(bid.getBidder()));
        return bidDto;
    }
}
