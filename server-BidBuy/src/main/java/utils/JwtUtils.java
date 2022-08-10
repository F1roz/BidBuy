package utils;

import dtos.AuthPayloadDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JwtUtils {
    private static final String keyStr = "nb2ZIMfwdDYi6MNMAGJHFvnNh7jfX+BQWKo8Krl1xB8=";

    public static String encode(AuthPayloadDto authPayloadDto){
        return Jwts.
                builder()
                .setSubject(authPayloadDto.serialize())
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(keyStr)))
                .compact();
    }

    public static AuthPayloadDto decode(String jwt){
        if(jwt==null) return null;
        return AuthPayloadDto.deserialize(Jwts.parserBuilder()
                .setSigningKey(Decoders.BASE64.decode(keyStr)).build().parseClaimsJws(jwt).getBody().getSubject());
    }

}
