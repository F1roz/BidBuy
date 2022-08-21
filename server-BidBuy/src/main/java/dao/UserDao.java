package dao;

import model.User;

import java.util.List;

public interface UserDao {
    public List<User> getAll(int page, int viewPerPage);
    public Integer getIdByUsername(String username);
    public Integer getAllCount();
    public User getById(int id);
    public User getByEmail(String email);
    public User getByUsername(String username);
    public void save(User user);
    public void update(User user);
    public void delete(int id);
    public User authenticateUser(String usernameOrEmail, String password);

    public boolean existsByUsername(String username);

   public boolean existsByEmail(String email);
}
