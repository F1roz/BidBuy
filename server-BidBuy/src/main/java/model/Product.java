package model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "status")
    private String status;

    @Column(name = "price")
    private String price;

    @Column(name = "sell_price")
    private String sell_price;

    @Column(name = "description")
    private String description;

    @Column(name = "buyer_id")
    private String buyer_id;

    @Column(name = "created_at")
    private String created_at;

    @Column(name = "image")
    private String image;

//    @Column(name = "seller_id")
//    private int sellerId;
//
//    public int getSellerId() {
//        return sellerId;
//    }
//
//    public void setSellerId(int sellerId) {
//        this.sellerId = sellerId;
//    }

    //    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    private User seller;
}
