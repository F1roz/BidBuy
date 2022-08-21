package model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

;

@Entity
@Table(name = "users")
@Setter
@Getter
@ToString
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nid")
    private String nid;

    @OneToOne
    @JoinColumn(name = "nid", insertable = false, updatable = false)
    private Kyc kyc;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "type")
    private String type;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "seller")
    private List<Product> soldProducts;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "buyer")
    private List<Product> boughtProducts;

}
