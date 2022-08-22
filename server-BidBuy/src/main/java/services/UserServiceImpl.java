package services;


import dao.UserDao;
import lombok.RequiredArgsConstructor;
import model.Product;
import model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<User> getAll(int page, int viewPerPage) {
        return userDao.getAll(page, viewPerPage);
    }

    @Override
    public Integer getIdByUsername(String userName) {
        return userDao.getIdByUsername(userName);
    }

    @Override
    public Integer getAllCount() {
        return userDao.getAllCount();
    }

    @Override
    public User getById(int id) {
        return userDao.getById(id);
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    public boolean existsByUsername(String username) {
        return userDao.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userDao.existsByEmail(email);
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
