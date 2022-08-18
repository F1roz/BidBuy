package controllers;


import dtos.JwtPayloadDto;
import dtos.LoginDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import services.UserService;
import utils.HashMapItem;
import utils.HashMapUtils;
import utils.JwtUtils;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        if (authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            String access_token = JwtUtils.encodeWithClaims(user);
            String refresh_token = JwtUtils.encode(user);
            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", access_token);
            tokens.put("refresh_token", refresh_token);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        } else {
            Map<String, String> res = new HashMap<>();
            res.put("message", "Invalid Username or Password");
            return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<Map<String, Object>> refreshToken(@RequestHeader(name = "Refresh-Token") String refreshToken) {
        if (refreshToken == null) return new ResponseEntity<>(HashMapUtils.build(
                HashMapItem.build("error", "Exception"),
                HashMapItem.build("message", "No Refresh-Token Header was passed")
        ), HttpStatus.BAD_REQUEST);
        JwtPayloadDto payload = JwtUtils.decode(refreshToken);
        model.User dbUser = userService.getByUsername(payload.getUsername());
        String access_token = JwtUtils.encodeWithClaims(dbUser);
        return new ResponseEntity<>(HashMapUtils.build(
                HashMapItem.build("access_token", access_token),
                HashMapItem.build("refresh_token", refreshToken)
        ), HttpStatus.OK);
    }

    @GetMapping("/current-user")
    public ResponseEntity<Map<String, Object>> currentUser(@RequestHeader(name = "Authorization", required = false) String Authorization) {
        if (Authorization == null) return new ResponseEntity<>(HashMapUtils.build(
                HashMapItem.build("error", "Exception"),
                HashMapItem.build("message", "No Authorization Header was passed")
        ), HttpStatus.BAD_REQUEST);
        try {
            JwtPayloadDto payload = JwtUtils.decode(Authorization);
            return new ResponseEntity<>(HashMapUtils.build(
                    HashMapItem.build("username", payload.getUsername()),
                    HashMapItem.build("roles", payload.getRoles())
            ), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HashMapUtils.build(
                    HashMapItem.build("error", "Exception"),
                    HashMapItem.build("message", e.getMessage())
            ), HttpStatus.BAD_REQUEST);
        }
    }

}
