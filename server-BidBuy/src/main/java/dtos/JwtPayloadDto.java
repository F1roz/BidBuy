package dtos;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class JwtPayloadDto {
    private final String username;
    private final String[] roles;
}
