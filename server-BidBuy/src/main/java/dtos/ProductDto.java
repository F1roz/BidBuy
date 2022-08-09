package dtos;

import model.Product;
import model.User;


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

    private UserDto user;

    public ProductDto() {
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSell_price() {
        return sell_price;
    }

    public void setSell_price(String sell_price) {
        this.sell_price = sell_price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBuyer_id() {
        return buyer_id;
    }

    public void setBuyer_id(String buyer_id) {
        this.buyer_id = buyer_id;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public ProductDto(int id, String name, String category, String status, String price, String sell_price, String description, String buyer_id, String created_at, String image, UserDto user) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
        this.price = price;
        this.sell_price = sell_price;
        this.description = description;
        this.buyer_id = buyer_id;
        this.created_at = created_at;
        this.image = image;
        this.user = user;
    }

    public static ProductDto fromDb(Product product){
        return new ProductDto(product.getId(),product.getName(),product.getCategory(),product.getStatus(),product.getPrice(),product.getSell_price(),product.getDescription(),product.getBuyer_id(),product.getCreated_at(),product.getImage(),null);
    }

    public static ProductDto fromDbWithRelations(Product product){
        ProductDto productDto = ProductDto.fromDb(product);
        productDto.setUser(UserDto.fromDb(product.getUser()));
        return productDto;
    }
}
