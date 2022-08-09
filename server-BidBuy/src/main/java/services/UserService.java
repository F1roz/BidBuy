package services;
import dtos.UserDto;
import model.Product;
import model.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
public interface UserService {
    public List<UserDto> getAll(
            @RequestParam(name = "page",required = false) int page,
            @RequestParam(name = "view",required = false) int viewPerPage
    );
    public Integer getAllCount();
    public UserDto getById(int id);
    public User getByEmail(String email);
    public User getByUsername(String username);
    public void save(User user);
    public void update(User user);
    public void delete(int id);

    public Product getProduct(Product product);


}
