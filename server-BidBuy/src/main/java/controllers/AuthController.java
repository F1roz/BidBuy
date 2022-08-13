package controllers;


import dtos.AuthPayloadDto;
import dtos.LoginDto;
import model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.UserService;
import utils.JwtUtils;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
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
    @PostMapping("/current-role")
    public ResponseEntity<String> currentRole(@RequestBody AuthPayloadDto authPayloadDto){
        return new ResponseEntity<>(authPayloadDto.getType(),HttpStatus.OK);
    }
}
