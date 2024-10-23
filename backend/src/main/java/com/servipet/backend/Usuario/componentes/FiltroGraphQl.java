package com.servipet.backend.Usuario.componentes;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class FiltroGraphQl extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        if(new AntPathRequestMatcher("/graphql").matches(request)){
            CachedBodyHttpServletRequest cachedRequest = new CachedBodyHttpServletRequest(request);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode body = mapper.readTree(cachedRequest.getInputStream());
            String query = body.get("query").asText();


            if (query.contains("getproductos")) {
                filterChain.doFilter(cachedRequest, response);
                return;
            }
            filterChain.doFilter(cachedRequest, response);
        }


        filterChain.doFilter(request, response);
        }
    }


