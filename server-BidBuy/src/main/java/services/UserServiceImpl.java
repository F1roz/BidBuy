package services;


import dao.UserDao;
import dtos.UserDto;
import model.Product;
import model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAll(int page, int viewPerPage) {
        return userDao.getAll(page, viewPerPage).stream().map(UserDto::fromDbWithRelations).collect(Collectors.toList());
    }

    @Override
    public Integer getAllCount() {
        return userDao.getAllCount();
    }

    @Override
    public UserDto getById(int id) {
        return UserDto.fromDbWithRelations(userDao.getById(id));
    }

    @Override
    public User getByEmail(String email) {
        return userDao.getByEmail(email);
    }

    @Override
    public User getByUsername(String username) {
        return userDao.getByUsername(username);
    }

    @Override
    public void save(User user) {
        userDao.save(user);
    }

    @Override
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    public void delete(int id) {
        userDao.delete(id);
    }

    @Override
    public Product getProduct(Product product) {
        return null;
    }

    @Override
    public User authenticateUser(String usernameOrPassword, String password) {
        return userDao.authenticateUser(usernameOrPassword, password);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getByUsername(username);
        if (user == null) throw new UsernameNotFoundException("User not found");
        Collection<SimpleGrantedAuthority> authorityCollection = new ArrayList<>();
        authorityCollection.add(new SimpleGrantedAuthority(user.getType()));
        return new org
                .springframework
                .security
                .core
                .userdetails
                .User(
                user.getUsername(),
                user.getPassword(),
                authorityCollection
        );
    }
}
