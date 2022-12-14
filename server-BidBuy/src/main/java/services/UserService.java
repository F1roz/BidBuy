package services;

import model.Product;
import model.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserService {
    public List<User> getAll(
            @RequestParam(name = "page", required = false) int page,
            @RequestParam(name = "view", required = false) int viewPerPage
    );

    public Integer getIdByUsername(String userName);

    public Integer getAllCount();

    public User getById(int id);

    public User getByEmail(String email);

    public User getByUsername(String username);

    public void save(User user);

    public void update(User user);

    public void delete(int id);

    public boolean existsByUsername(String username);

    public boolean existsByEmail(String email);


    public Product getProduct(Product product);

    public User authenticateUser(String usernameOrPassword, String password);

}
