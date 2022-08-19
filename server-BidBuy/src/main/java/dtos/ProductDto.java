package dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import model.Product;


@Data
@AllArgsConstructor
public class ProductDto {
    private int id;

    private String name;

    private String category;

    private String status;

    private String price;

    private String sell_price;

    private String description;

    private String buyer_id;

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
                product.getBuyer_id(),
                product.getCreated_at(),
                product.getImage(),
                null
        );
    }

    public static ProductDto fromDbWithRelations(Product product) {
        ProductDto productDto = ProductDto.fromDb(product);
        productDto.setSeller(UserDto.fromDb(product.getSeller()));
        return productDto;
    }
}
