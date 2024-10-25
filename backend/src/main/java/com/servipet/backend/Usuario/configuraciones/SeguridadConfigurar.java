package com.servipet.backend.Usuario.configuraciones;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.servipet.backend.Usuario.componentes.FiltroGraphQL;
import com.servipet.backend.Usuario.componentes.FiltroJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.servipet.backend.Usuario.componentes.JwtUtil;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;

import java.util.List;
@EnableWebSecurity
@Configuration
public class SeguridadConfigurar {
    private final JwtUtil jwtUtil;
    private final FiltroJwt filtroJwt;

    private final ServicioUsuario servicioUsuario;
    private final ApplicationContext applicationContext;
    private final ObjectMapper objectMapper;



    @Autowired
    public SeguridadConfigurar(FiltroJwt filtroJwt , JwtUtil jwtUtil, ServicioUsuario servicioUsuario, ApplicationContext applicationContext, ObjectMapper objectMapper) {
        this.filtroJwt = filtroJwt;
        this.jwtUtil = jwtUtil;
        this.servicioUsuario = servicioUsuario;
        this.applicationContext = applicationContext;
        this.objectMapper = objectMapper;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    corsConfig.setAllowCredentials(true);
                    corsConfig.addAllowedHeader("*");
                    return corsConfig;
                }))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize

                        .requestMatchers("/autenticacion/Login", "/usuario/Registrar").permitAll()

                        .anyRequest().authenticated()
                )
                .addFilterAfter(filtroJwt, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new FiltroGraphQL(jwtUtil, servicioUsuario, applicationContext , objectMapper), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}