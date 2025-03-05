package com.servipet.backend.Usuario.Configuraciones;
import com.servipet.backend.Usuario.Componentes.FiltroJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;


import java.util.List;
@EnableWebSecurity
@Configuration
public class SeguridadConfigurar {

    private final FiltroJwt filtroJwt;

    @Autowired
    public SeguridadConfigurar(FiltroJwt filtroJwt ) {
        this.filtroJwt = filtroJwt;

    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:3000", "http://192.168.1.32:3000",
                            "https://www.mercadopago.com", "https://stamp-cartridge-desirable-align.trycloudflare.com"));
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    corsConfig.setAllowCredentials(true);
                    corsConfig.addAllowedHeader("*");
                    return corsConfig;
                }))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/autenticacion/Login",
                                "/usuario/Registrar",
                                "/graphql/",
                                "/categoria/Consultar",
                                "/mail/forgot",
                                "/authgoogle/auth").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterAfter(filtroJwt, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public HttpFirewall customHttpFirewall() {
        return new DefaultHttpFirewall(); // Reemplaza el StrictHttpFirewall por uno más flexible
    }
}