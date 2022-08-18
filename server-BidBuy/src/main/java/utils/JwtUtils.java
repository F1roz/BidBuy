package utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import dtos.JwtPayloadDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtils {
    private static final String keyStr = "nb2ZIMfwdDYi6MNMAGJHFvnNh7jfX+BQWKo8Krl1xB8=";

    public static JwtPayloadDto decode(String jwt) {
        Algorithm algorithm = Algorithm.HMAC256(keyStr.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        return new JwtPayloadDto(username, roles);
    }

    public static String encodeWithClaims(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                .withClaim("roles", user
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList())
                )
                .sign(Algorithm.HMAC256(keyStr.getBytes()));
    }

    public static String encode(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                .sign(Algorithm.HMAC256(keyStr.getBytes()));
    }
}
