package dtos;

import model.Product;
import model.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDto {

    private int id;

    private String nid;

    private String email;

    private String username;

    private String password;

    private String type;

    private List<ProductDto> products;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNid() {
        return nid;
    }

    public void setNid(String nid) {
        this.nid = nid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<ProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDto> products) {
        this.products = products;
    }

    public UserDto() {
    }

    public UserDto(int id, String nid, String email, String username, String password, String type, List<ProductDto> products) {
        this.id = id;
        this.nid = nid;
        this.email = email;
        this.username = username;
        this.password = password;
        this.type = type;
        this.products = products;
    }

    public static UserDto fromDb(User user){
        return user==null?null: new UserDto(user.getId(),user.getNid(),user.getEmail(), user.getUsername() ,user.getPassword(),user.getType(),null);
    }

    public static UserDto fromDbWithRelations(User user){
        UserDto userDto = UserDto.fromDb(user);
        if(userDto==null) return null;
        userDto.setProducts(user.getProducts().stream().map(ProductDto::fromDb).collect(Collectors.toList()));
        return userDto;
    }

}
