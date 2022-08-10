package interceptors;

import org.springframework.web.servlet.HandlerInterceptor;
import utils.InterceptorUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class OnlyUser  implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return InterceptorUtils.preHandle(request,response,"user");
    }
}
