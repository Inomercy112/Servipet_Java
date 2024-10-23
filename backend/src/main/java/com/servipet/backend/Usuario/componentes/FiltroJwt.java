package com.servipet.backend.Usuario.componentes;
import com.servipet.backend.Usuario.clase.CustomUserDetails;
import com.servipet.backend.Usuario.clase.Usuario;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;




@Component
public class FiltroJwt extends OncePerRequestFilter {
    @Autowired
    public FiltroJwt(ServicioUsuario servicioUsuario, JwtUtil jwtUtil) {
        this.servicioUsuario = servicioUsuario;
        this.jwtUtil = jwtUtil;
    }


    private final JwtUtil jwtUtil;

    private final ServicioUsuario servicioUsuario;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain chain)
            throws IOException, ServletException {
        CachedBodyHttpServletRequest cachedRequest = new CachedBodyHttpServletRequest(request);
        final String authorizationHeader = cachedRequest.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwtToken);
            } catch (Exception ignored) {

            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            Usuario usuario = servicioUsuario.buscarPorNombre(username).orElse(null);
            if (usuario != null && jwtUtil.validateToken(jwtToken, username)) {
                UserDetails userDetails = new CustomUserDetails(usuario);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        chain.doFilter(cachedRequest, response);
    }

}