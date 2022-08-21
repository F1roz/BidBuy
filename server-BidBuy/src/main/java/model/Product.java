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
    private Float price;

    @Column(name = "sell_price")
    private Float sellPrice;

    @Column(name = "description")
    private String description;
//    @Column(name = "buyer_id",insertable = false, updatable = false)
//    private int buyerId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @Column(name = "created_at")
    private String created_at;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    private User seller;
}
