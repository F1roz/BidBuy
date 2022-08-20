package filters;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dtos.JwtPayloadDto;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import utils.HashMapItem;
import utils.HashMapUtils;
import utils.JwtUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class AuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String token = request.getHeader(AUTHORIZATION);
        if (token == null) {
            filterChain.doFilter(request, response);
        } else {
            try {
                JwtPayloadDto payload = JwtUtils.decode(token);
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                payload.getUsername(),
                                null,
                                Arrays
                                        .stream(payload.getRoles())
                                        .map(SimpleGrantedAuthority::new)
                                        .collect(Collectors.toList())
                        )
                );
                
                filterChain.doFilter(request, response);
            } catch (JWTVerificationException e) {
                response.setStatus(400);
                response.setContentType(APPLICATION_JSON_VALUE);
                Map<String, Object> res = HashMapUtils.build(
                        HashMapItem.build("error", "JWTVerificationException"),
                        HashMapItem.build("message", e.getMessage())
                );
                new ObjectMapper().writeValue(response.getOutputStream(), res);
            } catch (Exception e) {
                response.setStatus(400);
                response.setContentType(APPLICATION_JSON_VALUE);
                Map<String, Object> res = HashMapUtils.build(
                        HashMapItem.build("error", "Exception"),
                        HashMapItem.build("message", e.getMessage())
                );
                new ObjectMapper().writeValue(response.getOutputStream(), res);
            }
        }
    }
}
