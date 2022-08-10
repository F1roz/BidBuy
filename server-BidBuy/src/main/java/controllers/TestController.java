package controllers;


import dtos.AuthPayloadDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.security.Key;

@RestController
@RequestMapping("/test")
public class TestController {

    private final String keyStr = "nb2ZIMfwdDYi6MNMAGJHFvnNh7jfX+BQWKo8Krl1xB8=";

    @GetMapping("/")
    public String create() throws UnsupportedEncodingException {
        return Jwts.
                builder()
                .setSubject(AuthPayloadDto.serialize(1,"ash","ash-ash","admin"))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(keyStr)))
                .compact();
    }

    @GetMapping("/test")
    public AuthPayloadDto test(@RequestHeader("token") String token){
        if(token==null) return null;
        String payload = Jwts.parserBuilder()
                .setSigningKey(Decoders.BASE64.decode(keyStr)).build().parseClaimsJws(token).getBody().getSubject();
        return AuthPayloadDto.deserialize(payload);
    }

}
