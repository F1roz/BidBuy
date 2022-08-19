package dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import model.Product;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private int id;

    private String name;

    private String category;

    private String status;

    private String price;

    private String sell_price;

    private String description;

    private UserDto buyer;

    private String created_at;

    private String image;

    private UserDto seller;

    public static ProductDto fromDb(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getStatus(),
                product.getPrice(),
                product.getSell_price(),
                product.getDescription(),
                null,
                product.getCreated_at(),
                product.getImage(),
                null
        );
    }

    public static ProductDto fromDbWithRelations(Product product) {
        ProductDto productDto = ProductDto.fromDb(product);
        productDto.setSeller(UserDto.fromDb(product.getSeller()));
        productDto.setBuyer(UserDto.fromDb(product.getBuyer()));
        return productDto;
    }
}
