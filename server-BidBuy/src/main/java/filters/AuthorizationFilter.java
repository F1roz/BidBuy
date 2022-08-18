package filters;

import dtos.JwtPayloadDto;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import utils.JwtUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

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
            } catch (Exception e) {
                response.sendError(403, e.getMessage());
            }
        }
    }
}
