package controllers;


import dtos.AuthPayloadDto;
import dtos.LoginDto;
import model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import services.UserService;
import utils.JwtUtils;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        User user = this.userService.authenticateUser(loginDto.getUsernameOrEmail(),loginDto.getPassword());
        return (user==null)
                ? new ResponseEntity<>("Invalid Username or Password", HttpStatus.BAD_REQUEST)
                : new ResponseEntity<>(
                        JwtUtils.
                                encode(
                                        new AuthPayloadDto(
                                                user.getId(),
                                                user.getUsername(),
                                                user.getEmail(),
                                                user.getType()
                                        )
                                )
                , HttpStatus.OK
        );
    }
}
