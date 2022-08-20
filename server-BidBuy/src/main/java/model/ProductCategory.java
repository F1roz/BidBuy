package model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_categories")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class ProductCategory {
    @Id
    private int id;
    @Column(name = "name")
    private String name;
}
