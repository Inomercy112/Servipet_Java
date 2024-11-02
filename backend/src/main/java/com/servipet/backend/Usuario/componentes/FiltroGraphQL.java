package com.servipet.backend.Usuario.componentes;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.servipet.backend.Usuario.clase.CustomUserDetails;
import com.servipet.backend.etiquetas.PublicAccess;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import com.servipet.backend.Usuario.clase.Usuario;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.stream.Collectors;

@Component
public class FiltroGraphQL extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final ServicioUsuario servicioUsuario;
    private final ApplicationContext applicationContext;
    private final ObjectMapper objectMapper;

    @Autowired
    public FiltroGraphQL(JwtUtil jwtUtil, ServicioUsuario servicioUsuario, ApplicationContext applicationContext, ObjectMapper objectMapper) {
        this.jwtUtil = jwtUtil;
        this.servicioUsuario = servicioUsuario;
        this.applicationContext = applicationContext;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response,@NotNull FilterChain filterChain)
            throws IOException, ServletException {
        if (request.getAttribute("processed") != null) {
            filterChain.doFilter(request, response);
            System.out.println("procesado");
            return;
        }
        request.setAttribute("processed", true);
        if ("/graphql".equals(request.getRequestURI()) && "POST".equalsIgnoreCase(request.getMethod())) {
            String body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

            JsonNode jsonNode = objectMapper.readTree(body);




            JsonNode queryNode = jsonNode.get("query");
            System.out.println("QUERY: " + queryNode);
            if (queryNode == null || queryNode.isNull()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Missing 'query' field in the request body.");
                return;
            }
            String query = queryNode.asText();

            System.out.println("Request JSON: " + jsonNode);



            System.out.println("Request Query: " + query);
            String methodName = extractMethodNameFromQuery(query);
            System.out.println("Request Method: " + methodName);
            System.out.println("El metodo es publico?"+ isMethodPublic(methodName));
            if (isMethodPublic(methodName)) {
                filterChain.doFilter(request, response);
                System.out.println("es publico");
                return;
            }

            authenticateUser(request);

        }
        filterChain.doFilter(request, response);
    }

    private void authenticateUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        System.out.println("Token: " + token);

        validar(token, username, jwtToken, jwtUtil, servicioUsuario);
    }

    static void validar(String token, String username, String jwtToken, JwtUtil jwtUtil, ServicioUsuario servicioUsuario) {
        if (token != null && token.startsWith("Bearer ")) {
            jwtToken = token.substring(7);
            System.out.println("Token extraida: " + jwtToken);
            try {
                username = jwtUtil.extractUsername(jwtToken);
                System.out.println("Username: " + username);
            } catch (Exception ignored) {

            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Usuario usuario = servicioUsuario.buscarPorNombre(username).orElse(null);
            System.out.println("Usuario: " + usuario);
            System.out.println(jwtUtil.validateToken(jwtToken, username));
            if (usuario != null && jwtUtil.validateToken(jwtToken, username)) {
                UserDetails userDetails = new CustomUserDetails(usuario);
                System.out.println("detalles usuario"+userDetails);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                System.out.println(authentication);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            else {
                System.out.println("No se puede validar el usuario");
            }
        }
    }

    private boolean isMethodPublic(String methodName) {
        for (Object bean : applicationContext.getBeansWithAnnotation(Component.class).values()) {
            for (Method method : bean.getClass().getMethods()) {
                if (method.getName().equals(methodName) && method.isAnnotationPresent(PublicAccess.class)) {
                    return true;
                }
            }
        }
        return false;
    }

    private String extractMethodNameFromQuery(String query) {
        String cleanQuery = query.replaceAll("\\s+", " ").trim();
        String[] parts = cleanQuery.split("\\s+");
        if (parts.length > 1) {
            return parts[1];
        }
        return null;
    }
}
