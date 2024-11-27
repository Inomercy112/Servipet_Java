package com.servipet.backend.Usuario.Componentes;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import com.servipet.backend.Usuario.Modelo.CustomUserDetails;

import com.servipet.backend.Usuario.Servicio.ServicioUsuarioMinimal;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;




@Component
public class FiltroJwt extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    private final ServicioUsuarioMinimal servicioUsuariominimal;
    @Autowired
    public FiltroJwt(@Lazy ServicioUsuarioMinimal servicioUsuarioMinimal, JwtUtil jwtUtil) {
        this.servicioUsuariominimal = servicioUsuarioMinimal;
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain chain)
            throws IOException, ServletException {
        final String authorizationHeader = request.getHeader("Authorization");

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

            UsuarioDTO usuarioDTO = servicioUsuariominimal.buscarPorNombre(username).orElse(null);
            if (usuarioDTO != null && jwtUtil.validateToken(jwtToken, username)) {
                UserDetails userDetails = new CustomUserDetails(usuarioDTO);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        chain.doFilter(request, response);
    }

}