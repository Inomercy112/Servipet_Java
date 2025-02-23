package com.servipet.backend.Usuario.componentes;

import com.servipet.backend.Etiquetas.PublicAccess;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component

public class GraphQLAuthAspect {
    @Before("@annotation(publicAccess)")
    public void checkAuthorization(JoinPoint joinPoint, PublicAccess publicAccess) {

        if(publicAccess.isPrivate()){

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
                throw new RuntimeException("No autorizado: No se puede establecer el usuario");
            }
        }
    }
}
