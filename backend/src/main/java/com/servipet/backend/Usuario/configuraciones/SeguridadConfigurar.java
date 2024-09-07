package com.servipet.backend.Usuario.configuraciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SeguridadConfigurar {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf-> csrf.disable())

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/usuario/RegistroUsuario").permitAll()

                        .anyRequest().permitAll()
                )

                .logout(LogoutConfigurer::permitAll);

        return http.build();


    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configurar =new CorsConfiguration();
        configurar.setAllowedOrigins(List.of("http://localhost:3000"));
        configurar.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));

        configurar.setAllowedHeaders(List.of("*"));
        configurar.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configurar);
        return source;
    }
}
