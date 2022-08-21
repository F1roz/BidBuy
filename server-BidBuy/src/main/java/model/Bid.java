package model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
@Table(name = "bids")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "bid_price")
    private float bidPrice;

    @Column(name = "productId", insertable = false, updatable = false)
    private int productId;

    @Column(name = "bidder_id", insertable = false, updatable = false)
    private int bidderId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bidder_id")
    private User bidder;

    @Column(name = "created_at")
    private String created_at;

}
