package com.servipet.backend.Categoria.Resolvers;

import com.servipet.backend.Categoria.Modelo.Categoria;
import com.servipet.backend.Categoria.Servicio.ServicioCategoria;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class CategoriaResolver implements GraphQLQueryResolver {
    private final ServicioCategoria servicioCategoria;
    public CategoriaResolver(ServicioCategoria servicioCategoria) {
        this.servicioCategoria = servicioCategoria;
    }
    public List<Categoria> getcategorias() {

        return servicioCategoria.listarCategoria();
    }
}
