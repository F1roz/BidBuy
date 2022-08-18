package utils;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InterceptorUtils {
    public static boolean preHandle(HttpServletRequest request, HttpServletResponse response, String userType) throws Exception {
        String token = request.getHeader("token");
        if (token == null || token.isEmpty()) {
            response.sendError(HttpStatus.FORBIDDEN.value(), "Unauthenticated");
            return false;
        }
//        AuthPayloadDto payloadDto = JwtUtils.decode(token);
//        if(payloadDto==null){
//            response.sendError(HttpStatus.FORBIDDEN.value(),"Unauthenticated");
//            return false;
//        }
//        if(!payloadDto.getType().equalsIgnoreCase(userType)){
//            response.sendError(HttpStatus.UNAUTHORIZED.value(),"Unauthorized");
//            return false;
//        }
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Request-Headers", "*");
        response.addHeader("Access-Control-Allow-Headers", "*");
        response.addHeader("Access-Control-Allow-Methods", "*");
        return true;
    }
}
